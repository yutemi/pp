const {Router} = require("express")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const User = require("../models/User")
const router = Router()

router.post(
    "/register", 
    [
        check("email", "некорр email").isEmail(),
        check("pass", "длина 7 символов").isLength({min: 7})
    ],
    async(req, res) => {
        try {
            const errs = validationResult(req)

            if (!errs.isEmpty()){
                return res.status(400).json({
                    errs: errs.array(),
                    message: "некорр данные при регистрации"
                })
            }
            const {email, pass} = req.body

            const newUser = await User.findOne({email})

            if (newUser != null) {
                return res.status(400).json({message: "такой п уже есть"})
            }

            const hashedPass = await bcrypt.hash(pass, 12)
            const user = new User({email, pass: hashedPass})
            console.log(user)
            await user.save()

            res.status(201).json({message: "п создан"})


        } catch (error) {
            res.status(500).json({message: "?"})
        }
    })

router.post(
    "/login",
    [
        check("email", "некорр email").normalizeEmail().isEmail(),
        check("pass", "введите пароль").exists()
    ],
    async(req, res) => {
    try {
        const errs = validationResult(req)

        if (!errs.isEmpty()){
            return res.status(400).json({
                errs: errs.array(),
                message: "некорр данные при входе"
            })
        }
        
        const {email, pass} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: "п не найден"})
        }

        const isMatch = await bcrypt.compare(pass, user.pass)

        if (!isMatch) {
            res.status(400).json({message: "неверный пароль"})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get("jwtSecret"),
            {expiresIn: "1h"}
        )
        
        res.json({token, userId: user.id})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "?"})
    }
})

module.exports = router
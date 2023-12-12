const {Router} = require("express")
const router = Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const User = require("../models/User")

router.post(
    "/register", 
    [
        check("email", "некорр email").isEmail(),
        check("passw", "длина 7 символов").isLength({min: 1})
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
            const {email, passw} = req.body

            const newUser = await User.findOne({email})

            if (newUser) {
                return res.status(400).json({message: "такой п уже есть"})
            }

            const hashedpassw = await bcrypt.hash(passw, 12)
            const user = await User.create({email, passw: hashedpassw})

            await user.save()

            res.status(201).json({message: "п создан"})


        } catch (error) {
            return res.status(500).json({message: "reg err"})
        }
    })

router.post(
    "/login",
    [
        check("email", "некорр email").isEmail(),
        check("passw", "введите пароль").exists()
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
        
        const {email, passw} = req.body

        const user = await User.findOne({email: email})

        if (!user) {
            return res.status(400).json({message: "п не найден"})
        }

        const isMatch = await bcrypt.compare(passw, user.passw)

        if (!isMatch) {
            return res.status(400).json({message: "неверный пароль"})
        }

        const token = jwt.sign(
            {userId: user._id},
            config.get("jwtSecret"),
            {expiresIn: "1h"}
        )
        
        res.json({token, userId: user._id})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "login err"})
    }
})

module.exports = router
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Cart = require("../models/Cart")
const {validationResult} = require("express-validator")

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        config.get("jwtSecret"),
        {expiresIn: "24h"}
    )
}

class UserController {
    async registration(req, res) {
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
            const user = (await User.create({email, passw: hashedpassw})).save()

            return res.status(201).json({message: "п создан"})
        } catch (e) {
            return res.status(500).json({message: "reg err"})
        }
    }

    async login(req, res) {
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

            const token = generateJwt(user.id, user.email, user.role)

            const cart = (await Cart.create({owner: user.id})).save()
            
            res.send({token})
    
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message: "login err"})
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()

const { Router, json } = require("express")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const { check, validationResult } = require("express-validator")


const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', '6 characters at least')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorrect login data'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'That user already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'User was created' })

        } catch {
            res.status(500).json({ message: 'Smth is going wrong... Try again' })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Type current email').normalizeEmail().isEmail(),
        check('password', 'Type password').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorrect data'
                })
            }

            const { email, password } = req.body

            console.log(email, password)

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User is undefined' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Password is wrong' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch {
            res.status(500).json({ message: 'Smth is going wrong... Try again.' })
        }
    })


module.exports = router
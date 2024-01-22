const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const hashpassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            username,
            password: hashpassword
        })
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 'failed',
        })


    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'user not found'
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            res.status(200).json({
                status: 'success'
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'incorrect password'
            })
        }
    } catch (e) {

    }
}
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.find();
        res.status(200).json({
            status: 'success',
            result: user.length,
            data: {
                user
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 'failed',
        })
    }
}
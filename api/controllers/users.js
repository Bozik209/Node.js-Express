const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = {
    signup: (req, res) => {
        const { email, password } = req.body;

        // check if email used one
        User.find({ email }).then((users) => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: "Email exsts"
                })
            }
            // hase the password
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error
                    })
                }

                const user = new User({
                    _id: new mongoose.Types.ObjectId,
                    email,
                    password: hash
                })

                user.save().then((result) => {
                    console.log(result);

                    res.status(200).json({
                        message: 'User created'
                    })
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            });
        })

    },
    login: (req, res) => {
        const { email, password } = req.body;

        User.find({ email }).then((users) => {
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Autu failed'
                })
            }
            const [user] = users;

            bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Autu failed'
                    })
                }

                if (result) {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email
                    },
                        process.env.JWT_KEY,  // '../nodemon.js' 
                        {
                            expiresIn: '1H'  // login the user for 1 hour
                            //expiresIn: 86400 // expires in 24 hours
                        });

                    return res.status(200).json({
                        message: 'Autu successful',
                        token
                    })
                }

                return res.status(401).json({
                    message: 'Autu failed'
                });
            })
        })
    }
}
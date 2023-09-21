const express = require('express');
const adminRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'secretpass123' } = process.env;

const {
    getAdmin,
    getAllAdmin
} = require('../db');


adminRouter.get('/', async( req, res, next) => {
    try {
        const admin = await getAllAdmin();

        res.send({
            admin
        });
    } catch (error) {
        next(error)
    }
});

adminRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const admin = await getAdmin({email, password});
        if(!admin) {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect',
            })
        } else {
            const token = jwt.sign({id: admin.id, email: admin.email}, JWT_SECRET, { expiresIn: '1w'});
            res.send({ admin, message: "You're logged in!", token});
        }
    } catch(err) {
        next(err);
    }
});

module.exports = adminRouter;
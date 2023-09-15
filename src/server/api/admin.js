const express = require('express')
const adminRouter = express.Router();

const {
    createAdmin,
    getAdmin,
    getAdminByEmail
} = require('../db');

const jwt = require('jsonwebtoken')

adminRouter.get('/', async( req, res, next) => {
    try {
        const admin = await createAdmin();

        res.send({
            admin
        });
    } catch ({name, message}) {
        next({name, message})
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
        if(admin) {
            const token = jwt.sign({
                id: admin.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

adminRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _admin = await getAdminByEmail(email);

        if(_admin) {
            next({
                name: 'AdminExistsError',
                message: 'A admin with that email already exists'
            });
        }

        const admin = await createAdmin({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: admin.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = adminRouter;
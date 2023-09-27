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
    const { username, password, secret} = req.body;

    if(!username || !password || !secret) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an username, password and secret key.'
        });
    }
    try {
        const admin = await getAdmin({username, password, secret});
        if(!admin) {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username, password or secret key is incorrect',
            })
        } else {
            const token = jwt.sign({id: admin.id, username: admin.username}, JWT_SECRET, { expiresIn: '1w'});
            res.send({ admin, message: "You're logged in!", token});
        }
    } catch(error) {
        console.log("admin error", error);
        next(err);
    }
});

module.exports = adminRouter;
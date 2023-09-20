const express = require('express')
const websitesRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils')

const {
    getAllWebsites,
    getWebsiteById,
    getWebsiteByName,
    createWebsite
} = require('../db');


websitesRouter.get('/', async(req, res, next) => {
    try {
        const websites = await getAllWebsites();

        res.send({
            websites
        });
    } catch (error) {
        next(error)
    }
})

websitesRouter.get('/:id', async(req, res, next) => {
    try {
        const website = await getWebsiteById();

        res.send({
            website
        });
    } catch (error) {
        next(error)
    }
})

websitesRouter.get('/name', async(req, res, next) => {
    try {
        const website = await getWebsiteByName();

        res.send({
            website
        });
    } catch (error) {
        next(error)
    }
})

websitesRouter.post('/', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'url', 'image']}), async (req, res, next) => {
    try {
      const {name, description, url, image} = req.body;
      const existingWebsite = await getWebsiteByName(name);
      if(existingWebsite) {
        next({
          name: 'NotFound',
          message: `An website with name ${name} already exists`
        });
      } else {
        const createdWebsite = await createWebsite({name, description, url, image});
        if(createdWebsite) {
          res.send(createdWebsite);
        } else {
          next({
            name: 'FailedToCreate',
            message: 'There was an error creating your website'
          })
        }
      }
    } catch (error) {
      next(error);
    }
});

module.exports = websitesRouter;
const express = require('express')
const websitesRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils')

const {
    getAllWebsites,
    getWebsiteById,
    getWebsiteByName,
    createWebsite,
    deleteWebsite,
    updateWebsite,
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
        const website = await getWebsiteById(req.params.id);

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
          message: `A website with name ${name} already exists`
        });
      } else {
        const createdWebsite = await createWebsite({authorid: req.user.id, name, description, url, image});
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
      console.log("create website", error);
      next(error);
    }
});

websitesRouter.patch('/:websiteId', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'url', 'image'], atLeastOne: true}), async (req, res, next) => {
  try {
    const {name, description, url, image} = req.body;
    const {websiteId} = req.params;
    const websiteToUpdate = await getWebsiteById(websiteId);
    if(!websiteToUpdate) {
      next({
        name: 'NotFound',
        message: `No website by ID ${websiteId}`
      })
    } else if(req.user.id !== websiteToUpdate.authorid) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this website to perform this action"
      });
    } else {
      const updatedWebsite = await updateWebsite({websiteId, authorid: req.user.id, name, description, url, image});
      if(updatedWebsite) {
        res.send(updatedWebsite);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating your website'
        })
      }
    }
  } catch (error) {
    console.log("updating website error", error);
    next(error);
  }
});


websitesRouter.delete('/:websiteId', requireUser, async (req, res, next) => {
  try {
    const websiteToUpdate = await getWebsiteById(req.params.websiteId);
    if(!websiteToUpdate) {
      next({
        name: 'NotFound',
        message: `No website by ID ${websiteId}`
      })
    } else if(req.user.id !== websiteToUpdate.authorid) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the user who created this post to perform this action"
      });
    } else {
      const deletedWebsite = await deleteWebsite(req.params.websiteId)
      res.send({success: true, ...deletedWebsite});
    }
  } catch (error) {
    console.log("delete website", error);
    next(error);
  }
});

module.exports = websitesRouter;
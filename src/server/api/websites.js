const express = require('express')
const websitesRouter = express.Router();

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

websitesRouter.post('/', async (req, res, next) => {
  try {
    const {name, url, description, image} = req.body;
    const existingWebsite = await getWebsiteByName(name);

    if(existingWebsite) {
      next({
        name: 'NotFound',
        message: `A website with name ${name} already exists`
      });
    } else {
      const createdWebsite = await createWebsite({name, url, description, image});
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
    console.log("Error creating website!", error);
  }
});

websitesRouter.patch('/:websiteId', async (req, res, next) => {
  try {
    const {name, description, url, image} = req.body;
    const {websiteId} = req.params;
    const websiteToUpdate = await getWebsiteById(websiteId);
    if(!websiteToUpdate) {
      next({
        name: 'NotFound',
        message: `No website by ID ${websiteId}`
      })
    } else {
      const updatedWebsite = await updateWebsite({id: websiteId, name, description, url, image});
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

websitesRouter.delete('/:websiteId', async (req, res, next) => {
  try {
    const websiteToUpdate = await getWebsiteById(req.params.websiteId);
    if(!websiteToUpdate) {
      next({
        name: 'NotFound',
        message: `No website by ID ${websiteId}`
      })
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
const express = require('express')
const websitesRouter = express.Router();
const { requireUser, /*requiredNotSent*/ } = require('./utils')

const {
    getAllWebsites,
    getWebsiteById,
    getWebsiteByName,
    createWebsite,
    //deleteWebsite,
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

websitesRouter.post('/', requireUser, async (req, res, next) => {
  const { name, url, description, image, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const websiteData = {};

  if (tagArr.length) {
    websiteData.tags = tagArr;
  }

  try {
    websiteData.authorid = req.user.id;
    websiteData.name = name;
    websiteData.url = url;
    websiteData.description = description;
    websiteData.image = image;

    const website = await createWebsite(websiteData);

    if (website) {
      res.send(website);
    } else {
      next({
        name: 'WebsiteCreationError',
        message: 'There was an error creating your website. Please try again.'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

websitesRouter.patch('/:websiteId', requireUser, async (req, res, next) => {
  const { websiteId } = req.params;
  const { name, url, description, image, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (name) {
    updateFields.name = name;
  }

  if (url) {
    updateFields.url = url;
  }

  if (description) {
    updateFields.description = description;
  }

  if (image) {
    updateFields.image = image;
  }

  try {
    const originalPost = await getWebsiteById(websiteId);

    if (originalPost.author.id === req.admin.id) {
      const updatedWebsite = await updateWebsite(websiteId, updateFields);
      res.send({ website: updatedWebsite })
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot update a post that is not yours'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

/*websitesRouter.patch('/:websiteId', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'url', 'image'], atLeastOne: true}), async (req, res, next) => {
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
      const updatedWebsite = await updateWebsite({websiteId, name, description, url, image});
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
});*/

websitesRouter.delete('/:websiteId', requireUser, async (req, res, next) => {
  try {
    const website = await getWebsiteById(req.params.websiteId);

    if (website && website.author.id === req.user.id) {
      const updatedWebsite = await updateWebsite(website.id, { active: false });

      res.send({ website: updatedWebsite });
    } else {
      // if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError
      next(website ? { 
        name: "UnauthorizedUserError",
        message: "You cannot delete a post which is not yours"
      } : {
        name: "PostNotFoundError",
        message: "That post does not exist"
      });
    }

  } catch ({ name, message }) {
    next({ name, message })
  }
});


/*websitesRouter.delete('/:websiteId', requireUser, async (req, res, next) => {
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
});*/

module.exports = websitesRouter;
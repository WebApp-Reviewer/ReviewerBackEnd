const express = require('express');
const { createReview } = require ('./reviews');
const reviewsRouter = express.Router();

const {
    getAllReviews,
    getReviewById,
    getReviewByName,
    createReview
} = require('../db');

const jwt = require('jsonwebtoken')

reviewsRouter.get('/', async(req, res, next) => {
    try {
        const websites = await getAllReviews();

        res.send({
            websites
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.get('/:id', async(req, res, next) => {
    try {
        const website = await getReviewById();

        res.send({
            website
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.get('/name', async(req, res, next) => {
    try {
        const website = await getReviewByName();

        res.send({
            website
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.post('/', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'url', 'image']}), async (req, res, next) => {
    try {
      const {name, description, url, image} = req.body;
      const existingWebsite = await getReviewByName(name);
      if(existingWebsite) {
        next({
          name: 'NotFound',
          message: `An website with name ${name} already exists`
        });
      } else {
        const createdWebsite = await createReview({name, description, url, image});
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

async function deleteReviewById(id) {
  try {
      const {rows: [reviews]} = await db.query(`
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *;
      `, [id]);
      return reviews;
  } catch (error) {
      throw error;
  }
}

module.exports = reviewsRouter;
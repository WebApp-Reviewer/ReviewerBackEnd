const express = require('express');
const reviewsRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils')

const {
    getAllReviews,
    getReviewById,
    getReviewByName,
    createReview
} = require('../db');

const jwt = require('jsonwebtoken')

reviewsRouter.get('/', async(req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send({
            reviews
        });
    } catch (error) {
      console.log(error)
        next(error)
    }
})

reviewsRouter.get('/:id', async(req, res, next) => {
    try {
        const reviews = await getReviewById();

        res.send({
            reviews
        });
    } catch (error) {
      console.log(error)
        next(error)
    }
})

reviewsRouter.get('/name', async(req, res, next) => {
    try {
        const reviews = await getReviewByName();

        res.send({
            reviews
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.post('/', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'url', 'image']}), async (req, res, next) => {
    try {
      const {name, description, url, image} = req.body;
      const existingReview = await getReviewByName(name);
      if(existingReview) {
        next({
          name: 'NotFound',
          message: `An review with name ${name} already exists`
        });
      } else {
        const createdReview = await createReview({name, description, url, image});
        if(createdReview) {
          res.send(createdReview);
        } else {
          next({
            name: 'FailedToCreate',
            message: 'There was an error creating your review'
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
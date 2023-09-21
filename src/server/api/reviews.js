const express = require('express');
const reviewsRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils')

const {
    getAllReviews,
    getReviewById,
    getReviewByName,
    createReview,
    deleteReviewById
} = require('../db');


reviewsRouter.get('/', async(req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send({
            reviews
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.get('/:id', async(req, res, next) => {
    try {
        const review = await getReviewById(req.params.id);

        res.send({
            review
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.get('/name', async(req, res, next) => {
    try {
        const review = await getReviewByName();

        res.send({
            review
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.post('/', requireUser, requiredNotSent({requiredParams: ['name', 'content', 'rating', 'date']}), async (req, res, next) => {
    try {
      const {name, content, rating, date} = req.body;
      const existingReview = await getReviewByName(name);
      if(existingReview) {
        next({
          name: 'NotFound',
          message: `An review with name ${name} already exists`
        });
      } else {
        const createdReview = await createReview({name, content, rating, date});
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

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => {
  try {
    const {reviewId} = req.params;
    const reviewToUpdate = await getReviewById(reviewId);
    if(!reviewToUpdate) {
      next({
        name: 'NotFound',
        message: `No review by ID ${reviewId}`
      })
    } else if(req.user.id !== reviewToUpdate.creatorId) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this routine to perform this action"
      });
    } else {
      const deletedReview = await deleteReviewById(reviewId)
      res.send({success: true, ...deletedReview});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
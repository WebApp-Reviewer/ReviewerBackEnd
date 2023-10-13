const express = require('express');
const reviewsRouter = express.Router(); 
const websitesRouter = express.Router(); 
const { requireUser, requiredNotSent } = require('./utils')

const {
    getAllReviews,
    getReviewById,
    getReviewByName,
    createReview,
    deleteReview,
    updateReview,
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

reviewsRouter.get("/:websiteName", async (req, res) => {
  const websiteId = req.params.websiteId;
  
  try {
    const reviews = await getReviewsByWebsiteName(websiteName);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

reviewsRouter.post('/', requireUser, requiredNotSent({ requiredParams: ['name', 'content', 'rating', 'date', 'websiteid'] }), async (req, res, next) => {
  try {
    const { name, content, rating, websiteid } = req.body;
    const { reviewId } = req.params;
    
    // Generate the current date
    const date = new Date().toISOString();
    
    const existingReview = await getReviewById(reviewId);

    if (existingReview) {
      next({
        name: 'NotFound',
        message: `A review with Id ${reviewId} already exists`
      });
    } else {
      const createdReview = await createReview({
        authorid: req.user.id,
        name,
        content,
        rating,
        websiteid,
        date, // Use the generated date
      });

      if (createdReview) {
        res.send(createdReview);
      } else {
        next({
          name: 'FailedToCreate',
          message: 'There was an error creating your review'
        });
      }
    }
  } catch (error) {
    next(error);
  }
});



reviewsRouter.patch('/:id', requireUser, requiredNotSent({ requiredParams: ['name', 'content', 'rating', 'date'], atLeastOne: true }), async (req, res, next) => {
  try {
    const { name, content, rating, date } = req.body;
    const { id } = req.params; // Change variable name to 'id'
    const reviewToUpdate = await getReviewById(id);
    if (!reviewToUpdate) {
      next({
        name: 'NotFound',
        message: `No review by ID ${id}` // Change variable name to 'id'
      });

      console.log(id); // Change variable name to 'id'
    } else if (req.user.id !== reviewToUpdate.authorid) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this review to perform this action"
      });
    } else {
      const updatedReview = await updateReview({ id, authorid: req.user.id, name, content, rating, date }); // Change variable name to 'id'
      if (updatedReview) {
        res.send(updatedReview);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating your review'
        });
      }
    }
  } catch (error) {
    console.log("Updating review error", error);
    next(error);
  }
});


reviewsRouter.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const reviewToUpdate = await getReviewById(req.params.id);
    console.log('review to update', reviewToUpdate);
    console.log('req user id', req.user.id);
    if(!reviewToUpdate) {
      next({
        name: 'NotFound',
        message: `No review by ID ${req.params.id}`
      })
    } else if(req.user.id !== reviewToUpdate.authorid) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this review to perform this action"
      });
    } else {
      const deletedReview = await deleteReview(req.params.id)
      res.send({success: true, ...deletedReview});
    }
  } catch (error) {
    console.log("delete review error", error)
    next(error);
  }
});

module.exports = reviewsRouter;
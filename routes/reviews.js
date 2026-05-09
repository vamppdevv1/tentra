//!requiring
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const reviews = require("../controllers/reviews");
const Campground = require("../models/campground");
//!utils
const WrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../additional/middleware");

//!routes
//* review form
router.get("/", isLoggedIn, WrapAsync(reviews.reviewForm));
//* add a review
router.post("/", isLoggedIn, validateReview, WrapAsync(reviews.create));
//* delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviews.delete),
);
//!exporting
module.exports = router;

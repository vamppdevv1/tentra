//!requiring
const Review = require("../models/review");
const Campground = require("../models/campground");
const mongoose = require("mongoose");
//!review form load

module.exports.reviewForm = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Campground not found");
    return res.redirect("/campgrounds");
  }
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Campground not found");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/review", { campground });
};
//!create a new review

module.exports.create = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Successfully created a new review");
  res.redirect(`/campgrounds/${campground._id}`);
};
//!delete a review

module.exports.delete = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted the review");
  res.redirect(`/campgrounds/${id}`);
};

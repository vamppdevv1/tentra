//!requiring
const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

//!index page
module.exports.index = async (req, res) => {
  const Campgrounds = await Campground.find({});
  res.render("campgrounds/index", { Campgrounds });
};
//!new campground form load

module.exports.newForm = (req, res) => {
  res.render("campgrounds/new");
};
//!create campground logic

module.exports.create = async (req, res) => {
  //maptiler logic

  const geoData = await maptilerClient.geocoding.forward(
    req.body.campground.location,
    { limit: 1 },
  );
  if (!geoData.features?.length) {
    req.flash(
      "error",
      "Could not geocode that location. Please try again and enter a valid location.",
    );
    return res.redirect("/campgrounds/new");
  }
  //creating campground logic

  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.features[0].geometry;
  campground.location = geoData.features[0].place_name;
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully made a new campground");
  res.redirect(`/campgrounds/${campground._id}`);
};
//!edit form load

module.exports.editForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that campground");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

//!update campground logic

module.exports.update = async (req, res) => {
  const { id } = req.params;
  //maptiler logic

  const geoData = await maptilerClient.geocoding.forward(
    req.body.campground.location,
    { limit: 1 },
  );
  if (!geoData.features?.length) {
    req.flash(
      "error",
      "Could not geocode that location. Please try again and enter a valid location.",
    );
    return res.redirect(`/campgrounds/${id}/edit`);
  }
  //updating campground logic

  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  campground.geometry = geoData.features[0].geometry;
  campground.location = geoData.features[0].place_name;
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  campground.images.push(...imgs);
  //deleting images from cloudinary logic

  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  await campground.save();
  req.flash("success", "Successfully updated");
  res.redirect(`/campgrounds/${campground._id}`);
};
//!deleting campground logic

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  //deleting images from cloudinary
  const campground = await Campground.findById(id);
  for (let images of campground.images) {
    await cloudinary.uploader.destroy(images.filename);
  }
  //deleting from database
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a campground");
  res.redirect("/campgrounds");
};

//!show page form load
module.exports.show = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  });
  if (!campground) {
    req.flash("error", "Cannot find that campground");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

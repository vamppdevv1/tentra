//!requiring
const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
//!utils
const WrapAsync = require("../utils/WrapAsync");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../additional/middleware");
const { cloudinary } = require("../cloudinary");
//!routes
router
  .route("/")
  .get(WrapAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    WrapAsync(campgrounds.create),
  );
router.get("/new", isLoggedIn, campgrounds.newForm);

router
  .route("/:id")
  .delete(isLoggedIn, isAuthor, WrapAsync(campgrounds.delete))
  .get(WrapAsync(campgrounds.show))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    WrapAsync(campgrounds.update),
  );

router.get("/:id/edit", isLoggedIn, isAuthor, WrapAsync(campgrounds.editForm));

//!exporting
module.exports = router;

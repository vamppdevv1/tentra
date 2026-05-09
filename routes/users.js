//!requiring
const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
const { storeReturn } = require("../additional/middleware");
//!utils
const WrapAsync = require("../utils/WrapAsync");
//!routes
router
  .route("/login")
  .get(users.loginForm)
  .post(
    storeReturn,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login,
  );

router
  .route("/register")
  .get(users.registerForm)
  .post(WrapAsync(users.register));

router.get("/logout", users.logout);
//!exporting
module.exports = router;

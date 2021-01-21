const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.userRegister));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.userLogin
  );

router.get("/logout", users.redirectLogout);

module.exports = router;

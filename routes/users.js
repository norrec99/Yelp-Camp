const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.userRegister));

router.get("/login", users.renderLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.userLogin
);

router.get("/logout", users.redirectLogout);

module.exports = router;

if(process.env.NODE_ENV !== "production"){
  require("dotenv").config({quiet : true})
}
//!helmet config
const { scriptSrcUrls, styleSrcUrls, connectSrcUrls , fontSrcUrls, helmetConfig } = require('./additional/csp')
//!requiring
const { MongoStore } = require('connect-mongo');
const mongoose = require("mongoose");
const express = require("express");
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const passport = require("passport")
const LocalStrategy = require("passport-local")
const session = require("express-session");
const flash = require("connect-flash")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const campgroundRoutes = require("./routes/campgrounds");
const userRoutes = require("./routes/users")
const User = require("./models/user")
const reviewRoutes = require("./routes/reviews");
const helmet = require("helmet")
const app = express();
//!setting and middlewaresprocess.env.DB_URL ||
const dbUrl =  "mongodb://localhost:27017/yelp-camp"
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "Public")));
app.use(mongoSanitize());
app.use(helmet(helmetConfig))
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});
const sessionConfig = {
  store,
  name:"session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//!mongodb and express connect

// 
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error, failed to connect to mongodb")
    console.log(err);
  });
//!routes
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.use((req,res,next)=>{
  res.locals.currentUser = req.user
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})
app.get("/home",(req,res)=>{
  res.render("campgrounds/home")
})
app.use("/", userRoutes)
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
//!error handling mw

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "oh no something went wrong";
  res.status(statusCode).render("error", { err });
});
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("app is listening on port 3000");
});
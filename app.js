var express     = require("express"),
    app         = express(), 
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    User        = require("./models/user"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// SAFER TO USE WITH DIRNAME.
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATION.
app.use(require("express-session")({
  secret: "Once again Trento wins.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT || 3000, function(){
  console.log("Yelp Camp waiting for you on PORT 3000!")
})

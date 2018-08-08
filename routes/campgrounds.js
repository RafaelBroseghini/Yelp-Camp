var express = require("express"),
    router = express.Router();

var Campground = require("../models/campground");

router.get("/", isLoggedIn, function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if (err){
      console.log("Error here!")
    } else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user})
    }
  })
})

router.post("/", function(req, res){
  // Adds new campground.
  var name = req.body.name,
      image = req.body.image,
      description = req.body.description;
  var newCampground = {name:name, image:image, description:description}
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {   
      res.redirect("campgrounds/new");
    } else {
      res.redirect("campgrounds/");
    }
  })
  
})

router.get("/new", isLoggedIn, function(req, res){
  // Renders page that has form to add new campground.
  res.render("campgrounds/new")
})

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

router.get("/:id", isLoggedIn, function(req, res){
//   Find campground with provided id.
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err){
      console.log("Error blablabla!")
    } else  {
      res.render("campgrounds/show", {campground: foundCampground})
    }
  });
})

module.exports = router;
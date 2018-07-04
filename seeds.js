var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");


var data = [
  {name: "Rafas Camp", 
   image: "https://images.unsplash.com/photo-1500514300702-8833f1fba0c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ab7811af3890e7e0c2ea876666e15f31&auto=format&fit=crop&w=1400&q=80",
   description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  }
]

function seedDB(){  
  //Remove all campgrounds.
  Campground.remove({}, function(err){
    console.log("Removed campgrounds.")
    
  data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
      console.log("Created camp.")
      
      //create comment
      Comment.create({
        text: "This place is great but I wish there was internet",
        author: "Homer"
      }, function(err, comment){
        campground.comments.push(comment)
        campground.save();
        console.log("Created new comment.")
      })
    })
  })
 }) 
}

module.exports = seedDB;
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

//APP config
mongoose.connect("mongodb://localhost/restro",{useNewUrlParser:true, useUnifiedTopology:true});
app.set("view engine","ejs");
app.set(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Mongoose model config
var personSchema = new mongoose.Schema({
    name: String,
    totalSeats: String
});

var Person = mongoose.model("Person", personSchema);

//RESTful routes
//Main page
app.get("/", function(req, res){
    res.render("main");
});
app.get("/book", function(req, res){
    Person.find({}, function(err, persons){
        if(!err){
                res.render("index",{persons: persons});
        }

    });
});

//New route
app.get("/book/new", function(req, res){
    res.render("new");
});

app.post("/book", function(req, res){
    Person.create(req.body.person, function(err, newPerson){
        if(!err){
            res.redirect("/book");
        }
    });
});


app.get("/admin",function(req,res){
  res.render("admin");
});

app.post("/admin",function(req,res){
    if(req.body.username == "admin" && req.body.password == "admin"){
      res.redirect("/admindashboard");
    }
    else{
      res.render("admin");
    }
});

app.get("/admindashboard",function(req,res){
      res.render("admindashboard");
});





app.listen(3000, function(){
    console.log("Server started");
});

var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
mongoose.connect("mongodb+srv://Nikhil:man@cluster0-f1ejb.mongodb.net/test?retryWrites=true", function(err, db) {
    if(err){
    	console.log(err);
    }
    });
/*
var http = require('http');
var fs = require('fs');*/
app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));
var mangschema = new mongoose.Schema({
	name : String,
	Email : String,
	Credit : Number,
});

var Man = mongoose.model("Man", mangschema);

/*Man.create({name : "Rahul Rana", Email:"ranasingh@gamil.com", Credit:3500},
	function(err, cam){
		if(err){
			console.log(err);
		}
		else
		{
			console.log("Success");
		}
	});*/

app.get("/", function(req, res){
	res.render("Manage");
});


app.get("/userlist", function(req,res){
	Man.find({}, function(err,docs){
		if(err)
			res.json(err);
		else
			res.render("Userslist",{men:docs})
	});
});


app.post("/transfer/:ID",function(req,res){

var amout=req.body.Amount;
var id=req.params.ID;
console.log(id,amout);
	Man.find({}, function(err,docs){
		if(err)
			res.json(err);
		else
			res.render("Userscutlist",{men:docs,amounttocut:amout,fromid:id})

	});
});


app.get("/usercut/:id/:amount/:fromid",function(req,res){
var id=req.params.id,
	amount=req.params.amount,
	fromid=req.params.fromid;
console.log(fromid, id, amount);
Man.findOneAndUpdate({ "_id": id },
    { "$inc": { "Credit": amount } },{new:true},function(err, response) {
 if (err) {
 console.log("Error");
} 
});
console.log("First")

Man.findOneAndUpdate({ "_id": fromid },
    { "$inc": { "Credit": -(amount) } },{new:true},function(err, response) {
 if (err) {
 console.log(err);
} 
});

console.log("attempted")
res.redirect("/userlist");
});

 app.get("/credit/:id", function(req, res){
  var id=req.params.id;

		Man.findById({"_id":id}, function(err,docs){
		if(err)
			res.json(err);
		else
			res.render("credit",{men:docs,ID:id})

	});
});

/*app.post("/selectuser",function(req,res){

var name=req.body.namedata;
	res.redirect("/credit");
})*/

app.listen(process.env.PORT,process.env.IP);






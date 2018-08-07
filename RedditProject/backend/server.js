const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
var db = require('./db');
var User = require('./User');

//Initialize
var useronline = [];

useronline[0] = "";

//Static to serve static files such images, audio and fonts
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//
app.use(bodyParser.json());

module.exports = app;

// CREATES A NEW USER
app.post('/register', function (req, res) {


    User.find({ userName: req.body.userName }, function(err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        else {
            if (users.length != 0) return res.status(500).send("User used");
            else {

                //console.log(users[0].userName);

                User.create({
                    userName : req.body.userName,
                    data: [{
                        title:"",
                        permalink: '',
                        created: 0,
                        categ: ""
                    }]
                }, 
                function (err, user) {
                    if (err) return res.status(500).send("There was a problem adding the information to the database.");
                    //res.status(200).redirect("/History");
                    
                    User.find({userName: req.body.userName}, function (err, users) {
                        if (err) return res.status(500).send("There was a problem finding the users.");                                      
                        useronline = users;
                        //console.log(useronline[0].userName);
                        res.status(200).redirect('/favorites');
                    });
        
                })
            }
        }
    });

    /*

    User.create({
            userName : req.body.userName
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
*/
        
});

//SAVE USER LOGIN
app.post('/login', function (req, res) {
    User.find({ userName: req.body.userName }, function(err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        else {
            if (users.length == 0) return res.status(500).send("User Not Find!");
            //else {
                useronline = users;
                res.status(200).redirect('/favorites');
           // }
        }
    });
});


//ADD INFO
app.post('/addinfo', function (req, res) {

    var user_temp;
    User.find({userName: req.body.userName}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the users2.");

        ///////////////
        user_temp = user;
        if(user_temp[0].data[0].title.length==0 && user_temp[0].data[0].permalink.length==0 && user_temp[0].data[0].created==0) {
            
            User.update({"_id": user_temp[0]._id},
                { $set: {"data": {
                            "title": req.body.title, 
                            "created": req.body.created,
                            "permalink": req.body.permalink,
                            "categ": req.body.categ
                }}},
                { multi: true, upsert: true }, function(err, users) {
                    //console.log(req.body.userName);
                    //console.log(users);
                if (err) return res.status(500).send("There was a problem finding the users1.");

                User.find({userName: req.body.userName}, function (err, user) {
                    //console.log(user);
                    if (err) return res.status(500).send("There was a problem finding the users2.");                                      
                    useronline = user;
                    //res.status(200).console.log("Info Added!");
                    res.status(200).send(user);
                });
            });    
        }
        else {  

            User.update({"_id": user_temp[0]._id},
                { $push: {"data": {
                            "title": req.body.title, 
                            "created": req.body.created,
                            "permalink": req.body.permalink,
                            "categ": req.body.categ
                }}},
                { multi: true, upsert: true }, function(err, users) {
                    //console.log(req.body.userName);
                    //console.log(users);
                if (err) return res.status(500).send("There was a problem finding the users1.");

                User.find({userName: req.body.userName}, function (err, user) {
                    //console.log(user);
                    if (err) return res.status(500).send("There was a problem finding the users2.");                                      
                    useronline = user;
                    //res.status(200).console.log("Info Added!");
                    res.status(200).send(user);
                });
            }); 
        }   
    });
});


// RETURNS ALL THE USERS IN THE DATABASE
app.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");

        //app.render('/')
        res.status(200).json(users);
    });
});

// RETURNS ONE USERS IN THE DATABASE
app.get('/oneuser', function (req, res) {
    //console.log(useronline[0].userName);
    User.find({userName: useronline[0].userName}, function(err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
       
        res.status(200).json(users);
    });
});



app.listen(HTTP_PORT);
// Console will print the message
console.log("Express http server listening on port: " + HTTP_PORT);

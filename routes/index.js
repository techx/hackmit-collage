var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth-connect');

var auth = basicAuth('admin', process.env.HACK_COLLAGE_ADMIN_PASS);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Adds new user to the DB
router.post('/addNew' , function(req , res){
    console.log("Adding new ID to db");
    var db = req.db;
    var id = req.body.id;
    var name = req.body.name;
    var users = db.collection('users');

    console.log(req.body);

    var newUser ={};
    newUser['id'] = id;
    newUser['name'] = name;

    users.findOne({id : id}, function(err, result){
        if (err) console.log("DB Error");
        else if (result) {
            console.log("User already exists");
            console.log(result);
            res.send("userExists");
        }
        else {
            console.log("User not found, adding!");

            console.log(newUser);
            users.insert(newUser, function(err, doc){
                if (err) {
                    console.log("DB error");
                    res.send("DB error");
                }
                else {
                    console.log("User added to DB!");
                    res.send("success");
                }

            }).bind(res);
        }
    });
});

router.get('/submissions', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/all', auth,  function(req, res){
    console.log("getting userlist");
    var db = req.db;
    db.collection('users').find().toArray(function (err, items) {
        console.log(items);
        users = {
            "users" : items
        }
        res.render('users' , users);
    });
});

module.exports = router;

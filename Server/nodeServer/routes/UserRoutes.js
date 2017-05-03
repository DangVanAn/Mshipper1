var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/getall', function (req, res) {

// get all the users
    User.find({}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    var newUser = new User(req.body);


    console.log(newUser);
    console.log(req.body);

//     var newUser = User({
//         _id: '003',
//         _identify_card: '152130543',
//         _first_name: 'Hưng',
//         _last_name: 'Diệp Minh',
//         _email: 'diepminhhung14@gmail.com'
//     });
//
// save the user
    newUser.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('User created!');
            console.log('User created!');
        }
    });
});

module.exports = router;



var express = require('express');
var router = express.Router();
var User = require('../model/user');
router.post('/sent', function (req, res) {

    var newUser1 = new User(req.body);

    console.log(newUser1);
    console.log(req.body);

//     var newUser = User({
//         _id: '003',
//         _identify_card: '152130543',
//         _first_name: 'Hưng',
//         _last_name: 'Diệp Minh',
//         _email: 'diepminhhung14@gmail.com'
//     });
//
// // save the user
//     newUser.save(function (err) {
//         if (err)
//             return console.error(err);
//         else {
//             res.status(200).send('User created!');
//             console.log('User created!');
//         }
//     });
    res.status(200).send('User created!');
});
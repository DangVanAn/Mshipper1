var express = require('express');
var router = express.Router();
var ProductGroup = require('../models/ProductGroup');

router.get('/getall', function (req, res) {
// get all
    ProductGroup.find({_is_enabled : true}, function (err, productgroups) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(productgroups);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    ProductGroup.findOne({
        _id_product_group: req.body._id_product_group
    }).select().exec(function (err, productgroup) {
        if (err)
            return console.error(err);
        else {
            if (!productgroup) {
                var newProductGroup = new ProductGroup(req.body);
                console.log(newProductGroup);

                newProductGroup.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('Product group created!');
                        console.log('Product group created!');
                    }
                });
            }
            else {
                res.status(200).send("Mã nhóm hàng đã tồn tại!");
            }
        }
    });
});


router.post('/adds', function (req, res) {

    // console.log(req.body);
    var listData = req.body;
    console.log(listData.length);

    var index = 0;
    var listProductGroupExist = '';

    findFuntion(index);

    function findFuntion(index) {
        ProductGroup.findOne({_id_product_group: listData[index]._id_product_group
        }).select().exec(function (err, productgroup) {
            if (err)
                return console.error(err);
            else {
                if (productgroup) {
                    listProductGroupExist += ' ' + listData[index]._id_product_group;
                }
                index++;
                if(index < listData.length) {
                    findFuntion(index);
                }
                else{
                    saveFuntion();
                }
            }
        });
    }

    function saveFuntion() {
        if(listProductGroupExist.length > 0) {
            res.status(200).send('Mã kho:' +listProductGroupExist + ' Đã tồn tại');
        }
        else {
            ProductGroup.insertMany(listData, function(err, docs) {
                if(err) {
                    res.status(200).send('Error!');
                    console.log('Error!');
                }
                else {
                    res.status(200).send('Product groups created!');
                    console.log('Product groups created!');
                }
            });
        }
    }
});


router.post('/remove', function (req, res) {

    ProductGroup.findOne({
        _id_product_group: req.body._id_product_group
    }).select().exec(function (err, productgroup) {
        if (err)
            return console.error(err);
        else {
            if (productgroup) {
                productgroup._is_enabled = false;

                productgroup.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('Product Group removed!');
                        console.log('Product Group removed!');
                    }
                });
            }
            else {
                res.status(200).send("Thông tin loại hàng không tồn tại!");
            }
        }
    });
});

router.post('/getbyid', function (req, res) {
    console.log(req.body);

    ProductGroup.find({_id_product_group: req.body.id}, function (err, productgroup) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(productgroup);
            console.log('Find one success!!!');
        }
    }).select('-_token -_hashed_password -_id');
});

router.post('/updatebyid', function (req, res) {
    ProductGroup.findOneAndUpdate({_id_product_group: req.body._id_product_group}, req.body, function (err, productgroup) {
        if (err)
            return console.error(err);
        else {
            if(productgroup)
            {
                res.status(200).send('Product Group successfully updated!');
                console.log('Product Group successfully updated!');
            }
            else {
                res.status(200).send('Product Group unsuccessfully updated!');
                console.log('Product Group unsuccessfully updated!');
            }
        }
    });
});

module.exports = router;

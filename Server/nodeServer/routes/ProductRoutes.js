var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var vehicleRoute = require('../routes/VehicleRoutes');

var HashMap = require('hashmap');
var hashmap = new HashMap();

router.get('/getall', function (req, res) {
// get all
    Product.find({_is_enabled : true}, function (err, products) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(products);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    Product.findOne({
        _id_product: req.body._id_product
    }).select().exec(function (err, product) {
        if (err)
            return console.error(err);
        else {
            if (!product) {
                var newProduct = new Product(req.body);
                console.log(newProduct);

                newProduct.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('Product created!');
                        console.log('Product created!');
                    }
                });
            }
            else {
                res.status(200).send("Mã nhóm hàng đã tồn tại!");
            }
        }
    });
});

getListProduct();
function getListProduct() {
    Product.find({_is_enabled : true}, function (err, products) {
        if (err)
            return console.error(err);
        else {
            for(var i = 0; i < products.length; i++)
            {
                hashmap.set(products[i]._id_product, '_id_product');
            }

            console.log('getListProduct', products.length);
        }
    });
}
router.post('/adds', function (req, res) {

    vehicleRoute.getTestVehicle();

    var listData = req.body;
    console.log(listData.length);

    var listProductExist = '';

    findFuntion();
    function findFuntion() {
        for(var i = 0; i < listData.length; i++)
        {
            if(hashmap.get(listData[i]._id_product) === '_id_product'){
                listProductExist += ' ' + listData[i]._id_product;
            }
        }

        saveFuntion();
    }

    function saveFuntion() {
        if(listProductExist.length > 0) {
            res.status(200).send('Mã mặt hàng:' +listProductExist + ' Đã tồn tại');
        }
        else {
            Product.insertMany(listData, function(err, docs) {
                if(err) {
                    res.status(200).send('Error!');
                    console.log('Error!');
                }
                else {
                    res.status(200).send('Products created!');
                    console.log('Products created!');

                    getListProduct();
                }
            });
        }
    }


});


router.post('/remove', function (req, res) {

    Product.findOne({
        _id_product: req.body._id_product
    }).select().exec(function (err, product) {
        if (err)
            return console.error(err);
        else {
            if (product) {
                product._is_enabled = false;

                product.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('Product removed!');
                        console.log('Product removed!');
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

    Product.find({_id_product: req.body.id}, function (err, product) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(product);
            console.log('Find one success!!!');
        }
    }).select('-_token -_hashed_password -_id');
});

router.post('/updatebyid', function (req, res) {
    Product.findOneAndUpdate({_id_product: req.body._id_product}, req.body, function (err, product) {
        if (err)
            return console.error(err);
        else {
            if(product)
            {
                res.status(200).send('Product successfully updated!');
                console.log('Product successfully updated!');
            }
            else {
                res.status(200).send('Product unsuccessfully updated!');
                console.log('Product unsuccessfully updated!');
            }
        }
    });
});

module.exports = router;

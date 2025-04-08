const express = require("express");
const router = express.Router();
const products=require('../Controller/ProductsController');
const VerifyToken = require("./VerifyToken/VerifyToken");
const upload = require("../cloundinary/upload");


router.post('/product-name',VerifyToken,products.addCategory);
router.post('/add-subCategory',VerifyToken,products.addSubCategory);
router.post('/add-products',VerifyToken,upload.array("images",10),products.addProducts);
router.post('/update-products',VerifyToken,upload.array("images",10),products.updateProducts);

router.post('/delete-products',VerifyToken,products.deleteProducts);
router.get('/get-menProducts',products.menProducts);
router.get('/get-womenProducts',products.womenProducts);
router.get('/get-kidsProducts',products.kidProducts);


module.exports = router;
const express = require('express');
const route = express.Router();
const cont = require("../Controller/orderController");

route.post('/orderCreate',cont.createOrder);
route.get('/getOrder/:id',cont.getOrder);

module.exports = route;
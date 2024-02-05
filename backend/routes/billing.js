var express = require('express');
var router = express.Router();
var util = require('./util');

var orders = {};

/* GET --> return all orders for the currently logged in user. */
router.get('/', function (req, res, next) {
    // Check if user is logged in
    var u = util.checkAuthHeader(req);
    if (!u) {
        res.status(401).send('Unauthorized');
        return;
    }

    // Get all orders for the user
    var userOrders = Object.values(orders).filter((o) => o.userId === u.id);
    res.status(200).send(userOrders);
});


/* GET --> return the order with the given id. */
router.get('/:id', function (req, res, next) {
    // Check if user is logged in
    var u = util.checkAuthHeader(req);
    if (!u) {
        res.status(401).send('Unauthorized');
        return;
    }

    // Get the order with the given id
    var order = orders[req.params.id];
    if (!order) {
        res.status(404).send('Order not found');
        return;
    }

    // Check if the user is allowed to see the order
    if (order.userId !== u.id) {
        res.status(403).send('Forbidden');
        return;
    }

    res.status(200).send(order);
});


/* PUT --> start a new order. */
router.put('/', function (req, res, next) {
    // Check if user is logged in
    var u = util.checkAuthHeader(req);
    if (!u) {
        res.status(401).send('Unauthorized');
        return;
    }

    // Generate a random new order id
    var id = Math.random().toString(36).substring(7);
    var order = {
        id,
        userId: u.id,
        value: Math.round(Math.random() * 10000) / 100,
        status: 'PENDING',
    };

    setTimeout(() => {
        order.status = 'PAID';
    }, Math.round(Math.random() * 10000));

    orders[id] = order;

    res.status(201).send(order);
});

module.exports = router;
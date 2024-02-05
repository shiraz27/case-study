var express = require('express');
var router = express.Router();
var util = require('./util');

/* GET --> return the currently logged in user or return 401. */
router.get('/', function (req, res, next) {
    var u = util.checkAuthHeader(req);
    if (!u) {
        res.status(401).send('Unauthorized');
        return;
    }

    res.status(200).send(u);
});

/* POST --> log in a user. */
router.post('/', function (req, res, next) {
    // Create a new user (random uuid)
    var id = util.getNextUserId();
    var u = {
        id,
    };

    // Create a random token
    var t = Math.random().toString(36).substring(7);

    // Store token and user
    util.addUser(u, t);

    return res.status(200).send({
        id: u.id,
        token: t,
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/**
 * GET Media page
 */
router.get('/', function(req, res) {
    res.render('index', { title: 'Youtube Queue - media page' });
});

/**
 * GET Client page
 */
router.get('/client', function(req, res) {
    res.render('client', { title: 'Youtube Queue - client page '});
});

module.exports = router;

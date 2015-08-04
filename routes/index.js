
var express = require('express');
var router = express.Router();

/**
 * GET Media page
 */
router.get('/', function(req, res) {
    res.render('index', { title: 'Žižkostel - komunitní centrum' });
});

module.exports = router;

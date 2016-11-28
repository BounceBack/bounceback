var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map', { title: 'Homepage' });
});

/* GET Map page. */
router.get('/map/', function(req, res, next) {
  res.render('map', { title: 'Map' });
});

/* GET Review page. */
router.get('/review/', function(req, res, next) {
  res.render('index', { title: 'Review' });
});

module.exports = router;

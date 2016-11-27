var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Map page. */
router.get('/map/', function(req, res, next) {
  res.render('map', { title: 'Express' });
});

/* GET Review page. */
router.get('/review/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

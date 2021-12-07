var express = require('express');
var router = express.Router();
var auth = require('../dao/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(auth.login('g1'));
});

module.exports = router;

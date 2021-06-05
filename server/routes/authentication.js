var express = require('express');
var router = express.Router();

var authController = require('../controllers/authentication');

router.post('/login', function(req,res){
	authController.login(req,res);
});

module.exports = router;
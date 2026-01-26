var express = require('express');
const { signUp, signIn } = require('../controllers/user.controller.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signUp',signUp);
router.post('/signIn',signIn);
module.exports = router;

var express = require('express');
const { signUp, signIn, createProject, saveProject, getProjects, getProject } = require('../controllers/user.controller.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/createProject', createProject);
router.post('/saveProject', saveProject);
router.post('/getProjects', getProjects);
router.post('/getProject', getProject);
module.exports = router;

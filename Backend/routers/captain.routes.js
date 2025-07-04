const  express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth.middle');
const {body} = require('express-validator');
const controller = require('../controllers/captain.controller');


router.post('/register', [
    body('fullname.firstname').isLength({min:3}).withMessage("write fullname"),
    body('email').isEmail().withMessage("invalid Email"),
    body('password').isLength({min:6}).withMessage("write password"),
    body('phone').isLength({min:10}).withMessage("write phone"),
],controller.registerCaptain);


router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("write password"),
],controller.loginCaptain);


router.get('/profile', middleware.authCaptain, controller.getCaptainProfile);
router.post('/logout', middleware.authCaptain, controller.logoutCaptain);




module.exports = router;
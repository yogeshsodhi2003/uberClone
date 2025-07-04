const express = require('express');
const router =  express.Router();
const {body} = require('express-validator')
const usercontroller = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middle')

router.post('/register' , [
   
    body('fullname.firstname').isLength({min:3}).withMessage("write fullname"),
    body('email').isEmail().withMessage("invalid Email"),
 
    body('password').isLength({min:6}).withMessage("write password"),
],
usercontroller.registerUser
)


router.post('/login', 
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("write password"),
    usercontroller.loginUser
)

router.get('/profile', authMiddleware.authUser , usercontroller.getUserProfile)

router.post('/logout', authMiddleware.authUser, usercontroller.logoutUser)

module.exports = router;
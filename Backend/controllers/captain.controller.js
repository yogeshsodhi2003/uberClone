const captianService = require('../services/captain.service');
const captianModel = require('../models/captain.model');
const {validationResult} = require('express-validator');
const blackListToken = require('../models/blacklisttoken');


module.exports.registerCaptain = async (req, res, next) => {

    const errors =validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }

     const {fullname, email, password, phone} = req.body;
     const hashppassword = captainModele.hashpassword(password);
     const captain = await captianService.createCaptain({
            fullname,
            email,
            password,
            phone
     })
     const token = captain.generateAuthToken();
     res.status(201).json({token,captain})


}


module.exports.loginCaptain = async (req, res, next) => {
    const (email, password) = req.body;
    const captain = await captainModel.findOne({email});
    if(!captain || !await user.hashpassword){
        return  res.status(401).json({message :"invalid credentials"});
    }
    const token = captain.generateAuthToken();
    res.status(200).json({token,captain});

}

module.exports.getCaptainProfile = async (req,res,next) =>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req,res,next) =>{
     res.clearCookie('token');
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        await blackListToken.create({token});
        res.status(200).json({message:"Logout Successfully"});
}
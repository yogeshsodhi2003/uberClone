const userModel = require('../modules/user.model');
const blackListToken = require('../modules/blacklisttoken');
const captianModel = require('../models/captain.module ');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]  ;
    if (!token){
        return res.status(401).json({message: "Access Denied"});
    }
    const isBlacklisted = await blackListToken.findOne({token
    });
    if(isBlacklisted){
        return res.status(401).json({message: "Invalid Token"});
    }
    try{
        const decoded = JWT.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(decoded.id);
        req.user = user;
     return   next();
    }
    catch(err){
        return res.status(401).json({message: "Invalid Token"});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]  ;
    if (!token){
        return res.status(401).json({message: "Access Denied"});
    }
    const isBlacklisted = await blackListToken.findOne({token
    });
    if(isBlacklisted){
        return res.status(401).json({message: "Invalid Token"});
    
    }
    try{
        const decoded = JWT.verify(token, process.env.JWT_KEY);
        const captain = await captianModel.findById(decoded.id);
        req.captain = captain;
        return next();
    }
    catch(err){
        return res.status(401).json({message: "Invalid Token"});
    }
}   
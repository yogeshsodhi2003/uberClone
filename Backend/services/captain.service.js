const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    fullname , email, password , phone, }) => {
       if (!fullname || !email || !password) {
           throw new Error("all field are required")
       }
       const captain = captainModel.create(
        { 
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        }
       )
       return captain;
}
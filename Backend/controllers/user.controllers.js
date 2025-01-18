const userModel = require('../models/user.model.js');
const userService = require('../services/user.service')
// reuire the  
const { validationResult } = require('express-validation')


module.exports.registerUser = async (req, res, next) =>{
    const errors  = validationResult.errors
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { firstname, lastname, email, password} = req.body;
    

}
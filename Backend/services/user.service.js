const userModel = require('../models/user.model')


// make the fuction for creating the the user and the check 

module.exports.createUser = async ({
    firstname, lastname, email, password
}) =>{
    if(firstname || lastname || email || password ){
        throw new Error ("Please enter firstname or lastname or email or password first name")

    }
    const user = new userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password
    })
    return user;
}
const userModel = require('../models/user.model');

// Function to create a user with error handling
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    try {
        // Check if any required field is missing
        if (!firstname || !lastname || !email || !password) {
            throw new Error("Please enter firstname, lastname, email, and password.");
        }

        // Create a new user
        const user = await userModel.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
        });

        console.log("User created successfully:", user);
        return user;
    } catch (error) {
        // Log all errors to the console
        console.error("Error while creating user:", error.message);
        throw error; // Re-throw the error if needed
    }
};

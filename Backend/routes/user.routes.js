const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const userController = require('../controllers/user.controllers.js');

router.post('/register',[
    // Email validation
    body('email')
        .isEmail().withMessage('Invalid email format') // ईमेल की सही संरचना की जांच करता है।
        .isLength({ min: 5 }).withMessage('Email must be at least 5 characters long'), // ईमेल की न्यूनतम लंबाई जांचता है।
   // Password validation
   body('password')
   .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // पासवर्ड की न्यूनतम लंबाई 6 अक्षर होनी चाहिए।
   .notEmpty().withMessage('Password cannot be empty'), // पासवर्ड खाली नहीं हो सकता।

// First name validation
body('fullname.firstname')
   .isString().withMessage('First name must be a string') // पहला नाम स्ट्रिंग होना चाहिए।
   .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long') // पहला नाम कम से कम 3 अक्षर लंबा होना चाहिए।
   .notEmpty().withMessage('First name is required'), // पहला नाम अनिवार्य है।

// Last name validation
body('fullname.lastname')
   .optional() // अंतिम नाम वैकल्पिक (optional) है।
   .isString().withMessage('Last name must be a string') // अंतिम नाम स्ट्रिंग होना चाहिए।
   .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long') // अंतिम नाम कम से कम 3 अक्षर लंबा होना चाहिए।
],
userController.registerUser
)


module.exports = router;
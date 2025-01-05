const mongoose = require('mongoose'); 
// मोंगूस लाइब्रेरी को इम्पोर्ट किया गया है ताकि MongoDB के साथ इंटरैक्ट किया जा सके।

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: 'string',
            required: true,
            minlength: [3, 'first name must be at least 3 characters']
            // यूजर का पहला नाम अनिवार्य (required) है और इसकी न्यूनतम लंबाई 3 अक्षर होनी चाहिए। 
        },
        lastname:{
            type: 'string',
            minlength: [3, 'last name must be at least 3 characters']
            // यूजर का अंतिम नाम वैकल्पिक (optional) है लेकिन अगर भरा जाए तो इसकी न्यूनतम लंबाई 3 अक्षर होनी चाहिए।
        }
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
        // ईमेल आईडी अनिवार्य (required) है, इसे यूनिक होना चाहिए, और इसकी न्यूनतम लंबाई 5 अक्षर होनी चाहिए।
    },
    password:{
        type: 'string',
        required: true,
        select: false,
        // पासवर्ड अनिवार्य है लेकिन इसे डिफॉल्ट रूप से क्वेरी में सेलेक्ट नहीं किया जाएगा।
    },
    socketId:{
        type: 'string',
        // यूजर का `socketId` सेव करने के लिए जोड़ा गया है, जिसका उपयोग रियल-टाइम संचार के लिए किया जा सकता है।
    },
});
// यह पूरा schema यूजर डेटा के लिए MongoDB में संरचना तय करता है।

// JWT टोकन जनरेट करने का फंक्शन
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sing({ _id: this._id }, process.env.JWT_SECRET);
    // JWT टोकन यूजर के `_id` के आधार पर और एक सीक्रेट की मदद से जनरेट किया जा रहा है।
    return token;
    // टोकन को रिटर्न किया गया है ताकि इसे आगे इस्तेमाल किया जा सके।
};

// पासवर्ड की तुलना करने का फंक्शन
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    // `bcrypt` लाइब्रेरी का उपयोग करके पासवर्ड को हैश के साथ मिलाया जा रहा है।
};

// पासवर्ड को हैश करने का फंक्शन
userSchema.methods.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
    // पासवर्ड को `bcrypt` की मदद से हैश किया जा रहा है, 10 सॉल्ट राउंड्स के साथ।
};

// मॉडल को MongoDB में एक कलेक्शन के रूप में बनाने के लिए `userSchema` को उपयोग किया गया है।
const userModel = mongoose.model('userModel', userSchema);
// `userModel` नाम का मॉडल एक्सपोर्ट किया गया है ताकि इसे अन्य जगह इस्तेमाल किया जा सके।
module.exports = {userModel};

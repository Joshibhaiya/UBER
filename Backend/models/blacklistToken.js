const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // Token will automatically be removed after 1 hour
    },
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
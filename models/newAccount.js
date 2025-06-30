const mongoose = require('mongoose');

const newAccoutSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300  // expires after 5 minutes
    }
});

module.exports = mongoose.model('Account', newAccoutSchema);

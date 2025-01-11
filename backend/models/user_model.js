const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email format',
        },
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: (value) => /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value),
            message: 'Invalid phone number',
        },
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [200, 'Bio cannot exceed 200 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxlength: [16, 'Password cannot exceed 16 characters'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

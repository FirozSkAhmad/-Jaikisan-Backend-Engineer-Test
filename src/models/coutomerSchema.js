const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`,
        },
    },
    DOB: {
        type: Date,
        required: true,
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    address: {
        type: String,
        required: true,
    },
    customerID: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['ACTIVE', 'INACTIVE'],
    }, 
    deletedAt: {
        type: Date,
        default: null,
    }, 
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
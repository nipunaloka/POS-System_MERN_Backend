const mongoose = require('mongoose');
const bcryp = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        validate: {
            validator: function (v){
                return  /\S+@\S+\.\S+/.test(v);
            },
            message: "Email must be in Valid fromat!"
        }
    },

    phone: {
        type: String,
        require: true,
        validate:{
            validator: function (v){
                return /\d{10}/.test(v);
            },
            message: "Phone number must be a 10 digit number!"
        }
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: String,
        require: true
    }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcryp.genSalt(10);
    this.password = await bcryp.hash(this.password, salt);
})

module.exports = mongoose.model('User', userSchema);
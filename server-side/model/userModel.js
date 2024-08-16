import mongoose from "mongoose";
import bcrypt from 'bcrypt'; 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    about: {
        type: String,
        required: true,
        maxlength: 5000
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

export default mongoose.model("User", userSchema);

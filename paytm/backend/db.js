import mongoose from "mongoose";

(async function () {
    await mongoose.connect('mongodb+srv://admin:Aditya%404491@cluster0.ym43zx8.mongodb.net/paytm');
})().then(res => console.log("connection successful to DB"))
    .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
        lowercase: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
})

// For more details on how to use bcrypt, check out the documentation here: https://www.npmjs.com/package/bcrypt
// For more optimized way : https://mojoauth.com/blog/hashing-passwords-in-nodejs/

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // Avoid using float for currency values due to precision issues
    balance: {
        type: Number,
        required: true,
        min: 0,
    },
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

export { User, Account};
require('dotenv').config();
const mongoose = require("mongoose");

const LOCAL = process.env.LOCAL_MONGODB_URI;
const LIVE = process.env.MONGO_CONN_STR;
mongoose.connect(LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });  
const Schema = mongoose.Schema;
const requiredString = {type: String, required: true};
const userSchema = new Schema({
    name: requiredString,
    email: { ...requiredString, unique: true},
    phone: requiredString,
    password: requiredString,
    interests: requiredString,
    otp: { type: String, default: ''},
    valid_phone: { type: Boolean, default: false},
    valid_email: { type: Boolean, default: false},
    otp_time: { type: Number, default: Date.now},
    email_time: {type: Number, default: Date.now},
    profile_photo: {type: String, default: 'prfp.PNG'},
    cover_photo: {type: String, default: 'fb-cover-1.PNG'},
},  {timestamps: true});

const User = mongoose.models.userfour || mongoose.model("userfour", userSchema);
module.exports = User;
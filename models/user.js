
require('dotenv').config();
const mongoose = require("mongoose");

const LOCAL = process.env.LOCAL_MONGODB_URI;
const LIVE = process.env.MONGO_CONN_STR;


const config = (hostname) => {
    const host = hostname === "localhost" ? LOCAL : LIVE;
    mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true });
    const Schema = mongoose.Schema;
    const requiredString = { type: String, required: true };
    const uniqueString = { type: String, required: true, unique: true };
    const defaultTime = { type: Number, default: Date.now };
    const falseDefault = { type: Boolean, default: false };

    const userSchema = new Schema({
        name: requiredString,
        email: { ...requiredString, unique: true },
        phone: uniqueString,
        password: requiredString,
        interests: requiredString,
        valid_phone: falseDefault,
        valid_email: falseDefault,
        otp_time: defaultTime,
        email_time: defaultTime,
        profile_photo: { type: String, default: 'prfp.PNG' },
        cover_photo: { type: String, default: 'fb-cover-1.PNG' },
    }, { timestamps: true });

    return mongoose.models.userfive || mongoose.model("userfive", userSchema);
};

/*
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
*/

module.exports = config;

const express = require('express');
const config = require('../models/user');
const { hashSync, compareSync } = require('bcryptjs');

const PIN4digits = require('../utils/Pin');
const { getEncodedStringValue, recoverEncodedStringValue } = require('../utils/encode');
const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
const { mailer, resetLink } = require('../utils/utility');
const bodyParser = require('body-parser');
let KEY = process.env.FACTOR2_KEY;
const router = express.Router();
router.use(express.static('client'));
router.use(express.json());

router.post('/', async (req, res) => {

    let phone = req.body.phone;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let mailID = uuidv4();

    // Let's be sure nobody sends an absolutely invalid request
    const valid = phone.replace(/\D+/g, '').length > 7
        && name.replace(/\W+/g, '').length > 2
        && email.match(/(\w+)@(\w+)\.(\w+)/)
        && password.replace(/\s+/g, '').length > 5;

    if (!valid) {
        res.json({ status: false });
    }

    const OTP = PIN4digits();
    let otpStatus = await axios.get(`https://2factor.in/API/V1/${KEY}/SMS/${phone}/${OTP}`);



    /*
    encode the email and send it as part of the url, 
    then decode it once they get back through the link
    */
    const host = req.hostname;
    const liveLink = 'https://full-stack-dev/herokuapp.com';
    const encodedEmail = getEncodedStringValue(email);
    let link = host === "localhost" ?
        `http://localhost:3000/verify/${encodedEmail}`
        : `${liveLink}/verify/${encodedEmail}`;

    // Send verification email
    const mail = await mailer(email, link, name, mailID);
    const data = { ...req.body };
    data.password = hashSync(data.password);
    const User = config(host);
    const newUser = await new User(data);
    const newDoc = await newUser.save();
    if(newDoc){
        const otp2 = getEncodedStringValue(`${OTP}`);
        const doc = { otp: otp2, name: data.name, email: data.email, phone: data.phone, interests: 
            data.interests, profile_photo: data.profile_photo, cover_photo: data.cover_photo };

        await res.json({ status: true, ...doc });
    }else{
        await res.json({ sent: false });
    }
});


module.exports = router;
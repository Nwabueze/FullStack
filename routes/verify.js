
const express = require('express');
const config = require('../models/user');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cookie = require('cookie');
const { recoverEncodedStringValue } = require('../utils/encode');

const router = express.Router();
router.use(express.static('client'));
router.use(express.json());

// Verify the email address
router.get('/:email', async (req, res) => {
    const encodedEmail = req.params.email;
    console.log(encodedEmail);
    const User = config(req.hostname);
    if (!req.params.email) {
        res.json({ status: false });
    } else {
        // Decode the email
        let email = recoverEncodedStringValue(encodedEmail);
        
        // If any document was updated, email is valid.
        let update = User.updateOne({ "email": email }, { $set:{ "valid_email": true } });
        res.json({ status: update.modifiedCount });
        return;
    }
});

router.post('/otp/:otp', (req, res) => {

    const ck = cookie.parse(req.headers.cookie || "");
    // OTP encoded was passed to cookie, no need to save to database
    const User = config(req.hostname);
    if (ck.user.otp2) {
        const otp = recoverEncodedStringValue(ck.user.otp2);
        let update = User.updateOne({ email: ck.user.email }, { $set: {valid_otp: true} });
        res.json({ status: update.modifiedCount ? true : false });
    }else{
        res.json({status: false});
    }
});


module.exports = router;
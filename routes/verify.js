
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
router.post('/email/:email', async (req, res) => {
    const encodedEmail = req.params.email;
    console.log(encodedEmail);
    const Users = config(req.hostname);
    if (!req.params.email) {
        res.json({ status: false });
    } else {
        // Decode the email
        let email = recoverEncodedStringValue(encodedEmail);
        
        // If any document was updated, email is valid.
        let update = await Users.updateOne({ email: email }, { $set: { "valid_email": true } });
        res.json({ status: update.modifiedCount ? true : false });
    }
});

router.post('/otp/:otp', async (req, res) => {

    const ck = cookie.parse(req.headers.cookie || {});
    let user = {};
    // OTP encoded was passed to cookie, no need to save to database
    const Users = config(req.hostname);
    if(ck.hasOwnProperty("user")){
        user = JSON.parse(ck.user);
    }
    
    if(Object.keys(user).length) {
        if(!user.hasOwnProperty("otp")){
            res.json({ status: false });
        }
        const { otp, email } = user;
        const OTP2 = recoverEncodedStringValue(otp);
        //console.log(`${req.params.otp}:${OTP2}`);
        let match = req.params.otp === OTP2;
        
        let update = match ? 
        await Users.updateOne({ email: email }, { $set: {valid_phone: true} }) :
        { modifiedCount: 0 };
        
        if(update.modifiedCount){
            res.json({ status: true });
        }else{
            res.json({status: false});
        }
    }else{
        console.log(user.otp);
        res.json({status: false});
    }
});


module.exports = router;
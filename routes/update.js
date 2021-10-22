
const express = require('express');
const config = require('../models/user');
const cookie = require('cookie');
const { hashSync } = require('bcryptjs');
const { recoverEncodedStringValue } = require('../utils/encode');
const router = express.Router();
router.use(express.static('client'));
router.use(express.json());

router.put('/fields/:field/:value/:email', async (req, res) => {
    const ck = cookie.parse(req.headers.cookie || {});
    const Users = config(req.hostname);

    if (ck.hasOwnProperty('user')) {

        const user = JSON.parse(ck.user);
        if(!user.hasOwnProperty('email')){
            res.json({satus: false});
            return;
        }
        
        // Get the email from cookie or encoded in request param
        let email = user.email;
        console.log(email);
        let fieldset = {};
        const filter = {name: 1, email: 1, phone: 1, interests: 1, profile_photo: 1, cover_photo: 1, _id: 0};
        fieldset[req.params.field] = req.params.field === "password" ? hashSync(req.params.value) : req.params.value;

        let update = await Users.updateOne({ email: email }, {$set: fieldset});
        if(update.modifiedCount){
            let data = await Users.findOne({email: email}, filter);
            if(data){
                res.json({...data, status: true});
            }
        }else{
            res.json({status: false});
        }
    }else{
    
        // Email encoded in request param
        let email = recoverEncodedStringValue(req.params.email);
        console.log(email);
        let fieldset = {};
        const filter = {name: 1, email: 1, phone: 1, interests: 1, profile_photo: 1, cover_photo: 1, _id: 0};
        fieldset[req.params.field] = req.params.field === "password" ? hashSync(req.params.value) : req.params.value;

        let update = await Users.updateOne({ email: email }, {$set: fieldset});
        if(update.modifiedCount){
            let data = await Users.findOne({email: email}, filter);
            if(data){
                res.json({...data, status: true});
            }
        }else{
            res.json({status: false});
        }
    }
});

module.exports = router;
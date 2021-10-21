
const express = require('express');
//const config = require('../models/user');
const User = require('../models/user2');
const cookie = require('cookie');
const router = express.Router();
router.use(express.static('client'));
router.use(express.json());

router.put('/fields/:field/:value/:email', async (req, res) => {
    const ck = cookie.parse(req.headers.cookie || "");
    
    res.json({status:false});
    //const User = config(req.hostname);
    if (ck.user) {
        const email = ck.user.email || req.params.email;
        let fieldset = {};
        const filter = {name: 1, email: 1, phone: 1, interests: 1, profile_photo: 1, cover_photo: 1, _id: 0};
        fieldset[req.params.field] = req.params.value;
        
        let update = await User.updateOne({ email: email }, {$set: fieldset});
        

        console.log(update);
        let data = await User.findOne({email: email}, filter);
        if(data){
            res.json({...data, status: true});
        }
    }
    
});

module.exports = router;
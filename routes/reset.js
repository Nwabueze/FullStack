
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { getEncodedStringValue } = require('../utils/encode');
const { resetLink } = require('../utils/utility');

router.use(express.static('client'));
router.use(express.json());
router.use(express.static('client'));
const cookie = require('cookie');
// Send password reset link each time user changes password
router.post('/email', async (req, res) => {

    const ck = cookie.parse(req.headers.cookie || "");
    const host = req.hostname;
    const email = req.body.email;
    /*
    encode the email and send it as part of the url, 
    then decode it once they get back through the link
    */
    const liveLink = 'https://full-stack-dev/herokuapp.com';
    const encodedEmail = getEncodedStringValue(email);
    let link = host === "localhost" ?
        `http://localhost:3000/reset-password/${encodedEmail}` :
        `${liveLink}/reset-password/${encodedEmail}`;

    // Send password reset link
    const mail = await resetLink(email, link, uuidv4());
    if (mail) {
        res.json({ status: true });
    } else {
        res.json({ status: false });
    }
});

module.exports = router;
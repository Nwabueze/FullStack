const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const router = express.Router();
const config = require('../models/user');
router.use(express.static('client'));
router.use(express.json());


router.get('/logout', (req, res) => {
    res.json({status: true});
});

router.delete('/delete', (req, res) => {
    const User = config(req.hostname);
    User.deleteMany();
    res.json({status: true});
});

module.exports = router;

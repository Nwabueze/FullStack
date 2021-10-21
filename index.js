const express = require('express');
const app = new express();


app.use('/registry', require('./routes/register.js'));
app.use('/api/verify', require('./routes/verify.js')); 
app.use('/update', require('./routes/update.js')); 
app.use('/reset', require('./routes/reset.js'));
app.use('/login', require('./routes/login.js'));
app.use('/user', require('./routes/user.js'));
app.use((req,res) => {
    res.status(404)
        .send('This page cannot be found');
});

let server = app.listen(8000, () => {
    console.log('Listening', server.address().port);
});


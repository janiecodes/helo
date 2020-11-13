require('dotenv').config();
const express = require('express');
const massive = require('massive');
const ctrl = require('./controller');
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();
app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db);
    console.log('Yahoo! Connected to db!')
}).catch( err => console.log(err));

//ENDPOINTS
app.post('/api/auth/register', ctrl.register);
app.post('/api/auth/login', ctrl.login);
app.post('/api/auth/logout', ctrl.logoutUser);




app.listen(SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`))
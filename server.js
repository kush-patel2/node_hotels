const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('./auth');
require('./db');

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

//Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
};
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware =passport.authenticate('local', {session: false});


//Routes
app.get("/",function(req, res) {
    res.send("Welcome to my hotel.. How can I help You?");
});

const personRoutes = require('./routes/person');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menu');
app.use("/menu", menuRoutes);



app.listen(PORT, () => {
    console.log('listening on port 3000.');
});


//, localAuthMiddleware
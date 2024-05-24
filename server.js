const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Person = require('./models/person');
const MenuItem = require('./models/menu');

const db = require('./db');

app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.send("Welcome to my hotel.. How can I help You?");
});

const personRoutes = require('./routes/person');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menu');
app.use("/menu", menuRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000.');
})

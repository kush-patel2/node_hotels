const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');

router.post('/signup', async (req,res) => {
    try {
     const data = req.body;
     const newPerson = new Person(data);
     
    const response = await newPerson.save()
    console.log(' Person Data Saved');

    const payload = {
        id: response.id,
        username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({response: response, token: token});
    } catch (error) {
     console.log(error);
     res.status(500).json({error: 'Internal server Error'});
    }
 
 });

 //login route
 router.post("/login", async (req, res) =>{
    try {
        //Extract username and password from body
        const {username, password} = req.body;

        //Find user by username
        const user = await Person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
            return res.staus(404).json({ error: 'Invalid username or password'});
        }

        //generate tokens
        const payload = {
            id : user.id,
            username:  user.username
        };
        const token = generateToken(payload);

        //return token as response
        res.json({token})

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});
    }
 });

 //profile routes
 router.get('/profile', jwtAuthMiddleware, async (req,res) =>{
    try {
        const userData = req.user;
        console.log(" User Data", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});
    }
 })

 router.get("/", jwtAuthMiddleware, async (req,res) => {
    try {
        const data = await Person.find();
        console.log('Person Data Fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});
    }
});

router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
    if( workType == 'chef' || workType == 'waiter' || workType == 'manager'){
     const response = await Person.find({work: workType});   
     console.log('Data Fetched');
        res.status(200).json(response);
    }else{
        console.log("");
        res.status(500).json({error: 'Work Type Error'});
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return updated document
            runValidators: true, //run mongoose validations
        });

        if(!response){
            return res.status(404).json({ error: "No Person found"});s
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});
    }
});

router.delete('/:id', async (req, res) =>{
    try {
        const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if(!response){
        return res.status(404).json({ error: "No Person found"});
    }
    console.log('Data deleted');
        res.status(200).json({success: " Data deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});   
    }
    
});

//comment added

module.exports = router;
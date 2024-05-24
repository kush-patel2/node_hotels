const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/', async (req,res) => {
    try {
     const data = req.body;
     const newPerson = new Person(data);
     
    const response = await newPerson.save()
    console.log(' Person Data Saved');
    res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(500).json({error: 'Internal server Error'});
    }
 
 });

 router.get("/", async (req,res) => {
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
    
})

module.exports = router;
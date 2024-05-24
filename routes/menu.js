const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu');


router.post('/', async (req,res) => {
    try {
     const data = req.body;
     const newMenuItem = new MenuItem(data);
     
    const response = await newMenuItem.save()
    console.log('Menu Data Saved');
    res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(500).json({error: 'Internal server Error'});
    }
 
 });

 router.get("/", async (req,res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu Data Fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});
    }
});

router.get("/:taste", async (req, res) => {
    try {
        const taste = req.params.taste;
    if( taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
     const response = await MenuItem.find({taste: taste});   
     console.log('Data Fetched');
        res.status(200).json(response);
    }else{
        console.log("");
        res.status(500).json({error: 'taste Type Error'});
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'});
    }
});

module.exports = router;
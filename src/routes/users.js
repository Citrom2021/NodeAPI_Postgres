const express = require('express');
const UserRepo = require('../repos/user-repo');

const router = express.Router();

router.get('/users', async(req,res) => {

    // Run a query to get all users
    const users = await UserRepo.find();
    // Send result back to the person whoe made request
    // who made this request
    res.send(users);
});

router.get('/users/:id', async(req,res) => {
    const { id } = req.params;

    const user = await UserRepo.findById(id);

    // request handler
    if (user) {
        res.send(user);
    } else {
        res.send(404);
    }
    
});

router.post('/users', async(req,res) => {
    console.log(req.body);
});

router.put('/users/:id', async(req,res) => {});

router.delete('/users/:id', async(req,res) => {});

module.exports = router;
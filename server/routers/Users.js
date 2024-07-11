const express = require('express')
const router = express.Router()
const User = require("../models/user.js")
const mongoose = require("mongoose")

var ObjectId = mongoose.Types.ObjectId;

router.get("/getuser", async (req, res) => {
    User.find()
        .then(users => {
            res.json({users});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Internal server error"});
        })
})

router.get("/userById/:id", (req, res) => {
    const {id} = req.params
    User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).json({error:"User not found"});
            }
            res.status(200).json({success: user})
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: "Internal server error"});
        })
})

router.patch("/updateUser/:id", async (req, res) => {
    const {id} = req.params;
    try {
    const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body});
    if(!updatedUser) {
        return res.status(404).json({message: "User not found"});
    }
    res.json({success: updatedUser});
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
})

router.delete("/deleteUser/:id", (req, res) => {
    const {id} = req.params;
    try {
    const deleteUser = User.findByIdAndDelete(id);
    if(!deleteUser) {
        return res.status(404).json({message:"User not found"});
    }
    res.json({message: "User deleted successfully"});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
})

router.patch("/:id/follow", async (req, res) => {
    const {userId} = req.body;
    const {id} = req.params;

    if(userId === id) {
        return res.status(400).json({message: "You cant follow yourself"});
    }

        try {
            const user = await User.findById(id);
            const currentUser = await User.findById(userId);

            if(!user) {
                return res.status(404).json({message: "User not found"});
            }
            if(!currentUser) {
                return res.status(404).json({message: "Current user not found"});
            }
            if(!user.followers.includes(userId)) {
                await user.updateOne({$push: {followers: userId}});
                await currentUser.updateOne({$push: {followings: id}});
                res.json({message: "Success"});
            }
            else {
                res.json({message: "You already follow"});
            }
        }
        catch(error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
})

router.patch("/:id/unfollow", async (req, res) => {
    const {userId} = req.body;
    const {id} = req.params;

    if(userId === id) {
        return res.status(400).json({message: "You cant unfollow yourself"});
    }

        try {
            const user = await User.findById(id);
            const currentUser = await User.findById(userId);

            if(!user) {
                return res.status(404).json({message: "User not found"});
            }
            if(!currentUser) {
                return res.status(404).json({message: "Current user not found"});
            }
            if(user.followers.includes(userId)) {
                await user.updateOne({$pull: {followers: userId}});
                await currentUser.updateOne({$pull: {followings: id}});
                res.json({message: "Success"});
            }
            else {
                res.json({message: "You don't follow"});
            }
        }
        catch(error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
})


router.get("/:id/followers", async (req, res) => {
    const {id} = req.params;
    let followers = [];

    const user = await User.findOne({_id: id});
    if(!user) {
        res.json({message: "Invalid User ID"});
    }
    else {
        user.followers.map((e) => followers.push(e));
        res.json({followers: followers})
    }
})

router.get("/:id/followings", async (req, res) => {
    const {id} = req.params;
    let followings = [];

    const user = await User.findOne({_id: id});
    if(!user) {
        res.json({message: "Invalid User ID"});
    }
    else {
        user.followings.map((e) => followings.push(e));
        res.json({followings: followings})
    }
})

router.get("/userscount",async (req, res) => {
    try {
    const count = await User.countDocuments(); 
    if(count == 0) return res.status(404).json({message:"No users"});
    res.status(200).json({count: count});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
    })


router.get("/search/author?", async (req, res) => {
    const {q} = req.query;
    await User.find({
        username: 
            {
                $regex: q, 
                $options: 'i' //i for case-insensitivity
            }
        })
        .then((data) => res.json({data:data}))
        .catch((error) => res.json({error:error}));
});

module.exports = router;
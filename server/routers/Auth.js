const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const cookie = require('cookie-parser')
const User = require('../models/user.js')
const authentication = require('../middleware/Auth.js')

router.post('/register', async(req,res) => {
    const {username, email, password, confirmpassword, profilePic,
            instagram, twitter, facebook, linkedin, bio
    } = req.body

    const data = {
        username: username,
        email: email,
        password: password
    }

    function isValid(username) {
        return /^\w+$/.test(username);
    }

    const valid = isValid(username)
    const userExist = await User.findOne({email: email})
    const usernameExist = await User.findOne({username: username})

    if(!userExist) {
        if(data.username === "") {
            res.json({error: "Username cant be empty"})
        }
        else if(!valid) {
            res.json({error:"Invalid username"})
        }
        else if(usernameExist) {
            res.json({error:"Username already exists"})
        }
        else if(data.email === "") {
            res.json({error:"Email can't be empty"})
        }
        else if(!data.email.includes("@") && !data.email.includes(".")) {
            res.json({error:"Invalid Email"})
        }
        else if(!password || !confirmpassword) {
            res.json({error: "Provide password"})
        }
        else if(password === confirmpassword) {
            const newUser = new User(data)
            try {
                await newUser.save()
                res.json({message:"Registered"})
            }
            catch(error) {
                console.log(error)
                res.send(error)
            }
        }
        else {
            res.json({error:"Passwords did not match"})
        }
    }
    else {
        res.json({error:"User already exists"})
    }
})

router.post("/login", async (req,res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.json({error: "All fields required"});
    }
    try {
    const validUser = await User.findOne({email: email})
    if(!validUser) {
        return res.json({error: "Invalid User"});
    }
    
        const validPassword = await bcrypt.compare(password, validUser.password)

        if(!validPassword) {
            res.json({error:"Invalid password"})
        }
        else {
            const token = await validUser.generateAuthToken()
            res.cookie("JWTFINALTOKEN", token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true,
            })
            await validUser.save()
            const result = {
                validUser,token
            }
            res.status(201).json({status: 201, result})
        }
    }
    catch(error) {
        console.log(error);
        res.json({error: "Something went wrong"});
    }
})

router.get("/validuser",authentication, async(req,res) => {
    try {
        let userValid = await User.findOne({_id:req.userId})
        if(userValid) {
            res.status(201).json({status: 201, userValid})
        }
    }
    catch(error) {
        res.json({status: 401, userValid})
    }
})

router.get("/logout",authentication,async (req,res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((e) => {return e.token !== req.token})
        res.clearCookie("JWTFINALTOKEN",{path:'/'})
        await req.rootUser.save()
        res.status(201).json({status:201})
    }
    catch(error) {
        res.status(201).json({message: "no logout", tokens: req.rootUser.tokens})
    }
})

module.exports = router
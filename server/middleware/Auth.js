const jwt = require('jsonwebtoken')
const secretKey = "qwertyuiopasdfghjklzxcvbnmqwerty";
const Users = require('../models/user.js')

const authentication = async (req, res, next) => {
    try {
        console.log("Req headers", req.headers);
        //const authHeader = req.headers['authorization'];
        //if(!authHeader) {
          //  return res.status(401).json({message: "Auth header missing"});
        //}

        let token = req.cookies.JWTFINALTOKEN;

        if(!token) {
            return res.status(401).json({message:"Auth failed: JWT must be provided"})
        }
        const verifyToken = jwt.verify(token, secretKey)
        const rootUser = await Users.findOne({_id: verifyToken._id});
        if(!rootUser) {
            res.status(422).json({error: "user not found"})
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next()
    }
    catch(error) {
        res.json({status: 401, message: "Unauthorised user"});
        console.log(error);
    }
}

module.exports = authentication;
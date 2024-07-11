const express = require('express')
const Blog = require('../models/Blog.js')
//const {find, findById} = require('../models/user.js')
const router = express.Router()
const text = require("html-to-text")
const request = require("request")
const Users = require("../models/user.js")

const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
];

let totalBlogs = 0;

router.post("/addBlog", async(req,res) => {
    const d = new Date();
    const date = d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
    console.log(date);
    const {title, authorid, image, description, category, readtime} = req.body;
    const author = await Users.findOne({_id: authorid});
    const data = {
        title: title,
        authorid: authorid,
        authorImage: author.profilePic,
        authorName: author.username,
        image: image,
        description: description,
        category: category,
        readtime: readtime,
        publishDate: date,
    };
    const blog = new Blog(data);
    try {
        await blog.save();
        console.log(blog.authorid);
        res.json({message:"blog added"});
        console.log("Yayyy");
    }
    catch(error) {
        console.log(error);
    }
});

router.get("/blogs", async (req,res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error:"Server error"});
    }
})

router.get("/blog/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const blog = await Blog.findById(id);
            res.json({blog:blog});
        }
    
    catch(error) {
        console.log(error);
        res.json({error:error});
    }
})

router.patch("/update/blog/:id",async (req,res) => {
    const {id} = req.params;
    const d = new Date();
    const date = monthNames[d.getMonth()] + " " + d.getDate();
    const {
        title, authorid, image, description, likes,
        comments, category, publishDate, readtime, userId
    } = req.body;
    const data = {
        title: title,
        authorid: authorid,
        image: image,
        description: description,
        category: category,
        readtime: readtime,
        publishDate: "Edited" + date,
    };
    try {
    const blog = await Blog.findOne({_id: id});
    if(!userId) {
        return res.status(400).json({message:"Please provide userId"});
    }
    if(!blog) {
        return res.status(404).json({message:"Blog not found"});
    }
    console.log(blog.authorid);
    if(blog.authorid.toString() !== userId) {
        return res.status(403).json({message:"Cannot update others blog"})
    }
        
            const updateBlog = await Blog.findByIdAndUpdate(id, {$set: data},{new: true});
                if(!updateBlog) {
                    return res.status(404).json({message:"Blog not found"});
                }
                res.json({success: "Updated"});
            }  
        catch(error) {
            console.log(error);
            res.status(500).json({message:"Server error"});
        }
})

router.delete("/delete/blog/:id", async (req,res) => {
    const {id} = req.params;
    try {
    const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
        res.status(404).json({message:"Blog not found"})
        }
        res.status(200).json({message: "Blog deleted", deletedBlog: blog})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Server error"})
    }
})

router.get("/blogsByAuthorId/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const blogs = await Blog.find({authorid: id});
        res.json({Blogs: blogs});
    }
    catch(error) {
        res.json({err: error});
    }
})

router.get("/categorycount", async (req, res) => {
    try {
        const blockchain = await Blog.find({category: "Blockchain"});
        const fashion = await Blog.find({category: "Fashion"});
        const technology = await Blog.find({category: "Technology"});
        const business = await Blog.find({category: "Business"});
        const health = await Blog.find({category: "Health"});
        const fitness = await Blog.find({category: "Fitness"});
        const javascript = await Blog.find({category: "javascript"});
        res.json({
            blockchain: blockchain.length,
            fashion: fashion.length,
            technology: technology.length,
            business: business.length,
            health: health.length,
            fitness: fitness.length,
            javascript: javascript.length
        })
    }
    catch(error) {
        res.json(error);
    }
})

router.get("/tag/:id", async (req, res) => {
    const {id} = req.params;
    const blogs = await Blog.find({category: id});
    if(blogs) {
        res.json({blogs: blogs});
    }
    else {
        res.json({message: "No blogs available"});
    }
})

router.get("/blogscount", (req,res) => {
    Blog.count(function(err,count) {
        if(err) res.send(err);
        res.json({count: count});
    })
})

router.get("/search/title?", async (req,res) => {
    const {q} = req.query;
    await Blog.find({title: {$regex: q, $options: "$i"}})
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})

router.get("/search/category?", (req, res) => {
    const {q} = req.query;
    Blog.find({category: {$regex: q, $options: "i"}})
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
})

router.patch("/bookmark/:id", async(req,res) => {
    const {id} = req.params;
    const {userId} = req.body;
    const blog = await Blog.findOne({_id: id});
    const user = await Users.findOne({_id: userId});
    if(user) {
        try {
            if(!user.bookmarks.includes(id)) {
                await user.updateOne({$push: {bookmarks: id}});
                res.json("Bookmarked");
            }
            else {
                res.json("Already bookmarked");
            }
        }
        catch(error) {
            res.json({error: error})
        }
    }
})

router.patch("/unbookmark/:id", async(req,res) => {
    const {id} = req.params;
    const {userId} = req.body;
    const blog = await Blog.findOne({_id: id});
    const user = await Users.findOne({_id: userId});
    if(user) {
        try {
            if(user.bookmarks.includes(id)) {
                await user.updateOne({$pull: {bookmarks: id}});
                res.json("Unbookmarked");
            }
            else {
                res.json("Bookmark first");
            }
        }
        catch(error) {
            res.json({error: error})
        }
    }
})

router.patch("/like/:id", async (req, res) => {
    const {id} = req.params;
    const {userId} = req.body;
    const blog = await Blog.findOne({_id: id});
    if(blog) {
        if(!blog.likes.includes(userId)) {
            await blog.updateOne({$push: {likes: userId}});
            res.json("Liked");
        }
        else {
            res.json("You already liked it");
        }
    }
    else {
        res.json("No blogs found")
    }
})

router.patch("/unlike/:id", async (req, res) => {
    const {id} = req.params;
    const {userId} = req.body;
    const blog = await Blog.findOne({_id: id});
    if(blog) {
        if(!blog.likes.includes(userId)) {
            await blog.updateOne({$pull: {likes: userId}});
            res.json("Unliked");
        }
        else {
            res.json("You never liked it");
        }
    }
    else {
        res.json("No blogs found")
    }
})

router.patch("/test", (req,res) => {
    console.log(req.body);
}) 

module.exports = router;
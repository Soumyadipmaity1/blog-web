/*const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require ('body-parser')
const dotenv = require('dotenv')
const {Post} = require('./models/Post')

dotenv.config();
const app = express()
app.use(bodyParser.json());
const port = process.env.PORT || 5200

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:",error);
})




//get posts
app.get('/posts',async(req,res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({posts});
    }
    catch(error) {
        res.status(500).json({msg:error.msg})
    }
})
//add post
app.post('/posts',async(req,res) => {
    
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        })
        try {
        const newPost = await post.save()
        res.status(200).json("Post added")
    }
    catch(error) {
        res.status(500).json({msg:error.msg})
    }
})

//edit job with id
app.put('/posts/:id',async (req,res) => {
    try {
    const updatedPost = await findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        content: req.body.content,
        updatedAt: Date.now()
    },{new: true});
    if(!updatedPost) {res.status(400).json("Post not found")};
    res.status(200).json({msg:"Post updated"});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({msg:error.msg});
    }
})
//delete post
app.delete('/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/
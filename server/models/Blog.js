const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    authorid:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    authorImage: String,
    authorName: String,
    image: String,
    description: String,
    likes: Number,
    comments: [{type: mongoose.Schema.Types.ObjectId, red:'Comment'}],
    category: String,
    readtime: String,
    publishDate: String,
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date
    }
})

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;
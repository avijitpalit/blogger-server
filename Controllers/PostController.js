const Post = require('../Models/PostModel')

const createPost = async (req, res) => {
    try {
        const { title, content, thumb } = req.body
        const user = req.user
        // console.log(user);
        const post = await Post.create({ title, content, thumb, author: user._id })
        console.log(post);
        res.status(201).json({ done: true })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Unexpected error occured' })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id);
        const result = await Post.findByIdAndDelete(id)
        // console.log(result);
        if(result) res.status(201).json({ done: true })
        else res.status(200).json({ done: false })
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        if(posts) res.status(200).json({ done: true, posts })
        else res.status(400).json({ done: false, msg: 'Unexpected error occured' })
    } catch (error) {
        res.status(400).json({ done: false, msg: 'Unexpected error occured' })
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.find({ _id: id })
        if(post) res.status(200).json({ done: true, post })
        else res.status(400).json({ done: false, msg: 'Unexpected error occured' })
    } catch (error) {
        res.status(400).json({ done: false, msg: 'Unexpected error occured' })
    }
}

const getPostsByAuthor = async (req, res) => {
    try {
        let userId = req.user._id
        if(req.params) userId = req.params.userId
        const posts = await Post.find({ author: userId })
        if(posts) res.status(200).json({ done: true, posts })
        else res.status(400).json({ done: false, msg: 'Unexpected error occured' })
    } catch (error) {
        res.status(400).json({ done: false, msg: 'Unexpected error occured' })
    }
}

module.exports = { createPost, deletePost, getPosts, getPost, getPostsByAuthor }
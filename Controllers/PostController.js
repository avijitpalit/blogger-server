const Post = require('../Models/PostModel')
const User = require('../Models/UserModel')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body
        console.log(req.file);
        // const thumb = req.file.path
        const user = req.user
        // console.log(user);
        // const post = await Post.create({ title, content, thumb, author: user._id })
        // console.log(post);
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
        else res.status(400).json({ done: false, msg: 'Unexpected error occured, getPosts' })
    } catch (error) {
        res.status(400).json({ done: false, msg: 'Unexpected error occured, getPosts' })
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.find({ _id: id })
        if(post) res.status(200).json({ done: true, post })
        else res.status(400).json({ done: false, msg: 'Unexpected error occured, getPost' })
    } catch (error) {
        res.status(400).json({ done: false, msg: 'Unexpected error occured, getPost' })
    }
}

const getPostsByAuthor = async (req, res) => {
    try {
        const posts = req.params.userId ? await Post.find({ author: req.params.userId }) : await Post.find({ author: req.user._id })
        if(posts) res.status(200).json({ done: true, posts })
        else res.status(400).json({ done: false, msg: 'Wrong' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ done: false, error: 'Unexpected error occured' })
    }
}

const uploadTest = async (req, res) => {
    try {
        console.log(req.file);
        res.json({ done: true, msg: 'Working' })
    } catch (error) {
        console.log(error);
        res.json({ done: false, error: 'Unexpected error occured' })
    }
}

module.exports = { createPost, deletePost, getPosts, getPost, getPostsByAuthor, uploadTest }
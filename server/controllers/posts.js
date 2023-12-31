// import express from 'express';
// import mongoose from 'mongoose';

// import PostMessage from '../models/postMessage.js';

// const router = express.Router();
// export const getPosts = async(req, res) =>{
//     try{

//         const postMessage = await PostMessage.find();
//         res.status(200).json(postMessage);

//     }
//     catch(error){
//         res.status(404).json({message: error.message});
//     }

// }

// export const createPost = async (req, res)=>{
//     // res.send("post is created");
//     const post = req.body;
//     const newPost =new PostMessage (post);

//     try {
//         await newPost.save();  
//         res.status(201).json(newPost);
//     }
//     catch(error){
//         console.log("error in create post")

//         res.staus(409).json({message: error.message});
        
//     }

// }

// export const updatePost = async (req, res) => {
//     const { _id: _id } = req.params;
//     // const { title, message, creator, selectedFile, tags } = req.body;
//     const post = req.body;

//     if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with _id: `);

//     // const updatedPost = { creator, title, message, tags, selectedFile, _id: _id };
//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});


//     // await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

// export const deletePost = async (req, res) => {
//     const { id } = req.params;
//     console.log("reached");


//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with _id: `);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully." });
// }


// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:`);
    
//     const post = await PostMessage.findById(id);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
//     res.json(updatedPost);
    
// }



import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


export default router;
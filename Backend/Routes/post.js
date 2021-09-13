const router=require('express').Router();
const Post=require('../modals/Post');
router.post("/posts",async (req,resp)=>{
    const newPosts=await new Post(req.body)
        try{
            const savePosts=await newPosts.save();
            resp.status(200).json(savePosts);
        }
        catch(err){
            console.log("err");
            resp.status(500).json(err);
        }
});
router.put("/:id",async (req,resp)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            resp.status(200).json("POST HAS BEEN UPDATED");
        }
        else{
            resp.status(403).json("YOU CAN UPDATE ONLY YOUR POSTS");
        }
    }
    catch(err){
        resp.status(500).json(err);
    }
    
});
router.delete("/:id",async (req,resp)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            resp.status(200).json("POST HAS BEEN DELETED");
        }
        else{
            resp.status(403).json("YOU CAN DELETE ONLY YOUR POSTS");
        }
    }
    catch(err){
        resp.status(500).json(err);
    }
    
});
router.put("/:id/like",async (req,resp)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            resp.status(200).json("POST HAS BEEN LIKED");
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            resp.status(200).json("POST HAS BEEN UNLIKED");
        }
    }
    catch(err){
        resp.status(500).json(err);
    }
    
});
router.get("/:id",async (req,resp)=>{
    try{
        const post=await Post.findById(req.params.id);
        resp.status(200).json(post);
    }
    catch(err){
        resp.status(500).json(err);
    }
});
router.get("/timeline/all",async (req,resp)=>{
    try{
        const cuurentUser=await User.findById(req.body.userId);
        const userPosts=await Post.find({userId:cuurentUser._id});
        const friendPosts=await Promise.all(
            cuurentUser.followings.map((friendId)=>{
                Post.find({userId:friendId});
            })
        )
        resp.json(userPosts.concat(...friendPosts));
    }
    catch(err){
        resp.status(500).json(err);
    }
});
module.exports=router;
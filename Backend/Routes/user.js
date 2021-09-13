const express=require('express');
const router=express.Router();
const User=require('../modals/User');
const bcrypt=require('bcrypt');
// router.get("/",(req,resp)=>{
//     resp.send("USER ROUTES");
// });
router.put("/:id",async (req,resp)=>{
    if(req.body.userId==req.params.id||req.body.isAdmin){
        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                return resp.status(500).json(err);
            }
        }
        try{
            // console.log("BODY"+JSON.stringify(req.body));
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            resp.status(200).json("ACCOUNT HAS BEEN UPDATED");
        }
        catch(err){
             return resp.status(500).json(err);
        }           
    }
    else{
        return resp.status(403).json('YOU CAN UPDATE ONLY YOUR ACCOUNT!');
    }
});
router.delete("/:id",async (req,resp)=>{
    if(req.body.userId==req.params.id||req.body.isAdmin){
        // console.log(JSON.stringify(req.body));
        // console.log(JSON.stringify(req.params));
        try{
            const user=await User.findByIdAndDelete({_id:req.params.id});
            resp.status(200).json("ACCOUNT HAS BEEN DELETED");
        }
        catch(err){
             return resp.status(500).json(err);
        }           
    }
    else{
        return resp.status(403).json('YOU CAN DELETE ONLY YOUR ACCOUNT!');
    }
});
router.get("/:id",async (req,resp)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,updatedAt,...other}=user._doc;
        console.log(other);
        resp.status(200).json(other);
    }
    catch(err){
        // console.log(req.params.id);
        resp.status(500).json(err);
    }
});
router.put('/:id/follow',async (req,resp)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                // console.log(req.params.id);
                // console.log(req.body.userId);
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following:req.body.userId}});
                resp.status(200).json("USER HAS BEEN FOLLOWED");
            }
            else{
                resp.status(403).json("YOU ALREADY FOLLOW THIS USER");
            }
        }
        catch(err){
        resp.status(500).json(err);
        }
    }
    else{
        resp.status(500).json("YOU CANNOT FOLLOW YOURSLEF");
    }
});
router.put('/:id/unfollow',async (req,resp)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                // console.log(req.params.id);
                // console.log(req.body.userId);
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.body.userId}});
                resp.status(200).json("USER HAS BEEN UNFOLLOWED");
            }
            else{
                resp.status(403).json("YOU ALREADY UNFOLLOW THIS USER");
            }
        }
        catch(err){
        resp.status(500).json(err);
        }
    }
    else{
        resp.status(500).json("YOU CANNOT UN FOLLOW YOURSLEF");
    }
});
module.exports=router;
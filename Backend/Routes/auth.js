const router=require('express').Router();
const User=require('../modals/User');
const bcrypt=require('bcrypt');
router.post("/register",async (req,resp)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt);
        const NewUser=await new User({...req.body});
        const user=await NewUser.save();
        resp.status(200).json(user);
    }
    catch(err){
        resp.status(500).json(err);
    }
});
router.post("/login",async (req,resp)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            resp.status(404).send("USER NOT FOUND");
        }
        else{
            const validPassword=await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
            resp.status(404).send("INCORRECT PASSWORD");
            }
            else{
            resp.status(200).json(user);
            }
        }
    }
    catch(err){
        resp.status(500).json(err);
    }
})
module.exports=router;
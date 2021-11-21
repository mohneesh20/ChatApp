const router=require("express").Router();
const Conversation=require("../modals/Conversation");
router.post("/",async (req,res)=>{
    try{
        await Conversation.create(req.body,(err,result)=>{
            if(err){
                res.status(500).json(err);
                return;
            }
            res.set("json");
            res.status(200).json(result);
         });        
    }
    catch(err){
        res.status(500).json(err);
    }
});
router.get("/:userId",async (req,res)=>{
    try{
        const conversation=await Conversation.find({
            members:{$in:[req.params.userId]}
        });
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
});
router.get("/find/:firstUserId/:secondUserId",async (req,res)=>{
    try{
        const conversation=await Conversation.findOne({
            members:{
                $all:[req.params.firstUserId,req.params.secondUserId]
            },
        });
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports=router;
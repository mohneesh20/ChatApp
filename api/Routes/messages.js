const router=require("express").Router();
const Message=require("../modals/Message");
router.post("/",async (req,res)=>{
    try{
        await Message.create(req.body,(err,result)=>{
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
router.get("/:conversationId",async (req,res)=>{
    try{
        const messages=await Message.find({
            conversationId:req.params.conversationId
            });
            res.status(200).json(messages);                
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports=router;
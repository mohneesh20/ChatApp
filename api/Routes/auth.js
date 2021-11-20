const router = require("express").Router();
const User = require("../modals/User");
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await User.create(req.body,(err,result)=>{
      if(err){
        console.log("ERR:"+err);
        res.send(err);
        return;
      }
      console.log(result);
      res.set('json');
      res.json({'msg':'RECORD INSERTED'});
    })
  } catch (err) {
    res.status(500).json(err)
  }
});
router.post("/login", async (req, res) => {
  // console.log(JSON.stringify(req.body));
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      // console.log("User not found");
      return res.status(404).json("User Not Found");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
      // console.log("Login unsuccessfull");
      return res.status(404).json("Wrong password");
    }
    console.log("Login successfull");
    // console.log(user);
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
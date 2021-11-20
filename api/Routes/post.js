const router = require("express").Router();
const Post = require("../modals/Post");
const User = require("../modals/User");
//create a post
router.post("/", async (req, res) => {
  try {
    await Post.create(req.body,(err,result)=>{
      if(err){
        res.status(400).send(err);
        return;
      }
      // console.log(result);
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("POST UPDATED");
    } else {
      res.status(403).json("CAN UPDATE ONLY YOUR POST");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("POST DELETED");
    } else {
      res.status(403).json("CAN DELETE ONLY YOUR POST");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("POST LIKED");
      console.log("LIKED");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("POST DISLIKED");
      console.log("DISLIKED");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log("ID NOT FOUND");
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:_id", async (req, res) => {
  // console.log(req.params._id);
  try {
    const currentUser = await User.findById(req.params._id);
    // console.log(currentUser[0].username);
    const userPosts = await Post.find({ userId: currentUser._id });
    // console.log(userPosts);
    // console.log("-------");
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        console.warn(friendId);
        return Post.find({ userId: friendId });
      })
    );
    // console.log(friendPosts[0]);
    const AllPosts=userPosts.concat(...friendPosts);
    console.log(AllPosts);
    res.status(200).json(AllPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    // console.log(user);
    const posts = await Post.find({ userId: user._id });
    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
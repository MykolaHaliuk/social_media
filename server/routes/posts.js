const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  }
  catch (e) {
    res.status(500).json(e);
  }
})


// update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.updateOne({"$set": req.body})
      res.status(200).json("Post updated.")
    } else {
      res.status(403).json("You can update only your post")
    }
  } catch (e) {
    res.status(500).json(e);
  }
})
// delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.")
    } else {
      res.status(403).json("You can delete only your post")
    }
  } catch (e) {
    res.status(500).json(e);
  }
})
// like
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("🚀 ~ file: posts.js ~ line 50 ~ router.put ~ post", req.body.userId)
    
    if(!post.likes.includes(req.body.userId)) {
      await post.updateOne({$push: { likes: req.body.userId }})
      res.status(200).json("The post has been liked.")
    } else {
      await post.updateOne({$pull: {likes: req.body.userId}})
      res.status(200).json("The post has been disliked.")
    }

  } catch (e) {
    res.status(500).json(e)
  }

})
// get
router.get("/:id",async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) {
      res.status(404).json("Post does not exist.")
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
})

// get timeline
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId: currentUser._id});
    const friendPosts = await Promise.all(
      currentUser.followins.map(friendId =>
        Post.find({ userId: friendId })
      )
    )
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (e){
    res.status(500).json(e);
  }

})

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username});
    const userPosts = await Post.find({userId: user._id});
    res.status(200).json(userPosts)
  } catch (e){
    res.status(500).json(e);
  }

})


module.exports = router;
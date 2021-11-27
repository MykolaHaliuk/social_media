const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});
//get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  console.log("🚀 ~ file: user.js ~ line 45 ~ router.get ~ req.query", req.query)
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json("User does not exist");
    }
    const { password, updatedAt, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err);
  }
});

// get friends
router.get("/friends/:userId", async (req, res) => {
  try {
      const user = await User.findById(req.params.userId)
      console.log("🚀 ~ file: user.js ~ line 67 ~ router.get ~ user", user)
        
      const friends = await Promise.all(
        user.followins.map(friendId => {

            return User.findById(friendId);
        })
      )
      
      let friendList = [];
      friends.map(friend => {
        const {username, _id, profilePictrure} = friend;
        friendList.push({username, _id, profilePictrure})
      })
      res.status(200).json(friendList);
    } catch (e){
      res.status(500).json(e)
    }
})

// follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) res.status(404).json("User don`t found");
      const currentUser = await User.findById(req.body.userId);
      if (!currentUser) res.status(404).json("Current User don`t found");
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followins: req.body.userId } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You can`t follow yourself");
  }
});
// unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});
module.exports = router;

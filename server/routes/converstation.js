const router = require("express").Router();
const Converstation = require("../models/Converstation");

// new conv
router.post("/", async (req, res) => {
  const newConverstation = new Converstation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConverstation = await newConverstation.save();
    res.status(200).json(savedConverstation);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get
router.get("/:userId", async (req, res) => {
  try {
    const converstation = await Converstation.find({
      members: { $in: req.params.userId },
    });
    res.status(200).json(converstation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get conv includes to userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const converstation = await Converstation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(converstation);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

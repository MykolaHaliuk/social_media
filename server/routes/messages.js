const router = require("express").Router();
const Messages = require("../models/Messages");

// new conv
router.post("/", async (req, res) => {
  const newMessages = new Messages(req.body);
  try {
    const savedMessages = await newMessages.save();
    res.status(200).json(savedMessages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get 
router.get("/:converstationId", async (req, res) => {
  try {
    const messages = await Messages.find({
      converstationId: req.params.converstationId
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

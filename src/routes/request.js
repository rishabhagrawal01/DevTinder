const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const fromUserId = user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ error: "Invalid status: " + status });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.json({ message: "User not found!" });
        }
        
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ error: "Connection request already exists." });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        await connectionRequest.save();
        res.json({
            message: `${user.firstName} is ${status} in ${toUser.firstName}.`,
            data: connectionRequest,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = requestRouter;
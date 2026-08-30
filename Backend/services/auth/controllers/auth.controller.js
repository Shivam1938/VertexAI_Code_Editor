import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import crypto from "crypto";
import redis from "../config/redis.js";

export const login = async (req, res) => {
    try {
        const { token } = req.body;

        const decoded = await getAuth(app).verifyIdToken(token);

        let user = await User.findOne({
            firebaseUid: decoded.uid
        });

        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            });
        }

        // Generate a unique session ID and store it in Redis with an expiration time
        const sessionId = crypto.randomUUID();

        // Store the session ID and user information in Redis with an expiration time (e.g., 7 days)
        await redis.set(`sessionId-${sessionId}`, JSON.stringify({
            name: user.name,
            userId: user._id,
            email: user.email,
            avatar: user.avatar

        }), 'EX', 60 * 60 * 24 * 7); // Set expiration time to 7 days
        
        //
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            semesite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        return res.json({
            message: "Login successful",
            user
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
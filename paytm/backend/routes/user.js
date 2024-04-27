import { Router } from "express";
import zod from 'zod';
import jwt from 'jsonwebtoken';
import { User, Account } from "../db.js";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middlewares/auth.js";
import bcrypt from 'bcrypt';

const userRouter = Router();


// Sign Up Schema
const signUpSchema = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6),
    firstName: zod.string().max(30),
    lastName: zod.string().max(30),
});

// Upadate User Schema
const updateUserSchema = zod.object({
    username: zod.string().min(3).max(30),
    firstName: zod.string().max(30),
    lastName: zod.string().max(30),
});

// Sign Up Route
userRouter.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Incorrect Inputs" });
    }
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to find user" });
    }

    try {
        const password_hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password_hash,
            firstName,
            lastName,
        });
        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.floor(Math.random() * 10000), // Random balance between 1 and 10000
        });
    } catch (error) {
        res.status(500).json({ error: "Unable to create user" });
    }


    const token = jwt.sign({
        userId: newUser._id,
    }, JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({
        token,
        user: {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
        },
        message: "User created successfully",
    });
})

// Sign In Route
userRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username })
        const isMatch = await bcrypt.compare(password, existingUser.password_hash); // Match --> true, Not Match --> false
        if (!existingUser || !isMatch) {
            return res.status(400).json({ error: "Invalid Credentials / Invalid Password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to compare password" });
    }

    const token = jwt.sign({
        userId: existingUser._id,
    }, JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({
        token,
        user: {
            username: existingUser.username,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
        },
        message: "User signed in successfully",
    });
})

// Update User Route
userRouter.put('/update', authMiddleware, async (req, res) => {
    const { username, firstName, lastName } = req.body;
    const { success } = updateUserSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Incorrect Inputs" });
    }
    try {
        const user = await User.findOneAndUpdate({ _id: req.userId }, { // req.userId is coming from authMiddleware
            username,
            firstName,
            lastName,
        }, { new: true });
        res.status(200).json({
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            message: "User updated successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Unable to update user" });
    }


})

// Search User Route
userRouter.get('/bulk', async (req, res) => {
    try {
        const filter = req.query.filter || '';
        const users = await User.find({
            $or: [ // or --> either of the conditions should be true
                { username: { $regex: filter, $options: 'i' } }, // i --> case insensitive // regex --> regular expression 
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } },
            ]
        });
        res.status(200).json({
            user: users.map(user => ({ // map --> to show all the users which are matching the filter above
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            }))
        });
    } catch (error) {
        res.status(500).json({ error: "Unable to find users" });
    }
})


export default userRouter;
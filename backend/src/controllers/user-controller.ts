import {NextFunction, Request, Response } from "express";
import {IUser} from "../types/user.type";
import User from "../models/User";
import {compare, hash} from "bcrypt";
import {COOKIE_NAME, createToken} from "../utils";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (e) {
        console.log(e);
        return res.sendStatus(403).json({message: "Error", cause: e.message});
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).send("User already exists");
        }
        const hashedPassword = await  hash(password, 10);
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({message: "Welcome!", name: user.name, email: user.email});
    } catch (e) {
        console.log(e);
        return res.sendStatus(200).json({message: "Error", cause: e.message});
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> => {
    try {
        const { email, password } = req.body;
const user = await User.findOne({email});
if (!user) {
    return res.status(401).send("User is not registered");
}
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(403).send("Email or password is incorrect");
    }
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
    });


    const token = createToken(user._id.toString(), user.email, "7d");
const expires = new Date();
expires.setDate(expires.getDate() + 7);
res.cookie(COOKIE_NAME, token, {
    path: "/",
    domain: "localhost",
    expires,
    httpOnly: true,
    signed: true,
});

        return res.status(200).json({message: "OK", name: user.name, email: user.email});
    } catch (e) {
        console.log(e);
        return res.sendStatus(200).json({message: "Error", cause: e.message});
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
        return res.status(401).send("User is not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id){
        return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({message: "OK", name: user.name, email: user.email});
} catch (e) {
    return res.status(401).json({message: "ERROR", cause: e.message})
}
}

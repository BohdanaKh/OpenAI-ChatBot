import {NextFunction, Request, Response } from "express";
import User from "../models/User";
// import {configureOpenAI} from "../config/openai.config";
// import { OpenAI } from "openai";
import {ChatCompletionMessageParam} from "openai/resources";
export const generateChatCompletion = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=> {
    const message = req.body;
    console.log(message);
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({message: "User is not registereg OR Token malfunctioned"})
//grab chats of user
        const chats = user.chats.map(({role, content}) => ({
            role,
            content,
        })) as ChatCompletionMessageParam[];
        chats.push({content: message, role: "user"});
        user.chats.push({content: message, role: "user"});
        // delete following 2
        await user.save();
        console.log(user.chats);
        //send all chats with new one to openAI API
// const config = configureOpenAI();
//         const openai = new OpenAI({apiKey: process.env.OPEN_AI_SECRET, organization: process.env.OPENAI_ORGANIZATION_ID});
//         const chatResponse = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo", messages: chats
//         });
//         console.log(chatResponse);
//         user.chats.push(chatResponse.choices[0].message);
//         await user.save();
//         return res.status(200).json({chats: user.chats})
        const chatResponse = "This should be the answer"
        user.chats.push({content: chatResponse, role: "assistant"});
        await user.save();
        console.log(user.chats);
        return res.status(200).json({chats: user.chats})
    } catch (e) {
return res.status(500).json({message: "Something went wrong"})
    }
}

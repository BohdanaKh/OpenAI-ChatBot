import { NextFunction, Request, Response } from "express";

import User from "../models/User";
// import {configureOpenAI} from "../config/openai.config";
// import { OpenAI } from "openai";
// import {ChatCompletionMessageParam} from "openai/resources";
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User is not registered OR Token malfunctioned" });
    //grab chats of user
    const chats = user.chats?.map(({ role, content }) => ({
      role,
      content,
    }));
    // as ChatCompletionMessageParam[];
    chats.push({ content: message.message, role: "user" });
    user.chats.push({ content: message.message, role: "user" });

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

    // const chatResponse = {message: "It should be the OpenAI API response, but it's not free"};
    const chatResponse = {
      message:
        'Certainly! In JavaScript, you can declare a function using the following syntax:\n\n```javascript\nfunction functionName(parameter1, parameter2) {\n // Function body: code to be executed\n // You can perform operations, manipulate data, etc.\n // Optionally, you can return a value using the "return" statement\n}\n```\n\nHere\'s an example of a simple function named `greet` that takes a parameter `name` and logs a greeting message to the console:\n\n```javascript\nfunction greet(name) {\n console.log("Hello, " + name + "!");\n}\n\n// Calling the function\ngreet("John"); // Output: Hello, John!\n```\n\nIn addition to the regular function declaration, you can also use arrow functiones introduced in ES6.  Here\'s an example:\n\n```javascript\nconst greet = (name) => {\n console.log("Hello, " + name + "!");\n}\n\ngreet("John"); // Output: Hello, John!\n```\n\nThese are the basic syntaxes for declaring functions in Javascript. You can define functions with or without parameters, and they can perform any desired operations before optionally returning a result.',
    };

    user.chats.push({ content: chatResponse.message, role: "assistant" });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User is not registered or Token is malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (e) {
    return res.status(500).json({ message: "Error", cause: e.message });
  }
};

export const deleteUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User is not registered or Token is malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (e) {
    return res.status(500).json({ message: "Error", cause: e.message });
  }
};

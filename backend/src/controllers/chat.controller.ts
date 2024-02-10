import {NextFunction, Request, Response } from "express";

class ChatController {
    public async findAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
    //     try {
    //
    //     } catch (e) {
    //         next(e);
    //     }
    }

}

export const chatController = new ChatController();
import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import * as mongoose from "mongoose";
import cors from "cors";
import {appRouter} from "./routers";
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: [
            "Authorization",
            "Content-Type",
            "Origin",
            "Access-Control-Allow-Origin",
        ],
        preflightContinue: false,
        optionsSuccessStatus: 200,
    })
);

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(express.urlencoded({ extended: true }));


// remove in production
// app.use(morgan("dev"));

app.use("/api/v1", appRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;

    return res.status(status).json({
        message: error.message,
        status: error.status,
    });
});



// connections and listeners
const PORT = process.env.PORT || 5003;
const DB_URL = process.env.MONGODB_URL || "mongodb+srv://dananvm:VqfhvixYVEPabqZW@cluster0.l6nmsq4.mongodb.net/ai-chatbot?retryWrites=true&w=majority";
const dbConnect = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log('Connecting to database');
            await mongoose.connect(DB_URL);
            dbCon = true
        } catch (e) {
            console.log('Database unavailable, wait 3 seconds');
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}

const start = async () => {
    try {
        await dbConnect();
        await app.listen(PORT, () => {
            console.log(`Server has started on PORT ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
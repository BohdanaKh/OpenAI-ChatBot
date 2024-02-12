import { Document } from "mongoose";

interface IChat {
  id: string;
  role: string;
  content: string;
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  chats?: IChat[];
}

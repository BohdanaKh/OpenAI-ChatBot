import {FC} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import {useAuth} from "../context/AuthContext.tsx";

interface IProps {
    content: string;
    role: "user" | "assistant"
}

const ChatItem: FC<IProps> = ({ content, role}: IProps ) => {
const auth = useAuth();
    return (
        role === "assistant" ? (
        <Box sx={{display: "flex", p: 2, borderRadius: 2, bgcolor: "#004d5612", my:2, gap: 2}}>
           <Avatar sx={{ml: "0"}}>
               <img src={"openai1.png"} width={"40px"}/>
           </Avatar>
            <Box>
                <Typography fontSize={"20px"} color={"lightgrey"}>{content}</Typography>
            </Box>
        </Box>
        ) :
            (
                <Box sx={{display: "flex", p: 2, borderRadius: 2, bgcolor: "#004d56", gap: 2}}>
                    <Avatar sx={{ml: "0", bgcolor: "black", color: "white"}}>
                        {auth?.user?.name[0]}
                        {/*{auth?.user?.name.split(" ")[1][0]}*/}
                    </Avatar>
                    <Box>
                        <Typography fontSize={"20px"}>{content}</Typography>
                    </Box>
                </Box>
            )
    );
};

export {ChatItem};

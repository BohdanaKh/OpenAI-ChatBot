import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useAuth } from "../context/AuthContext.tsx";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

interface IProps {
  content: string;
  role: "user" | "assistant";
}

const ChatItem: FC<IProps> = ({ content, role }: IProps) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        borderRadius: 2,
        bgcolor: "#004d5612",
        my: 1,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src={"openai1.png"} alt={"openai"} width={"40px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px", color: "lightgrey" }}>
            {content}
          </Typography>
        )}

        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language={"javascript"}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px", color: "lightgrey" }}>
                {block}
              </Typography>
            ),
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        borderRadius: 2,
        bgcolor: "#004d56",
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {/*{auth?.user?.name.split(" ")[1][0]}*/}
      </Avatar>
      <Box>
        <Box>
          {!messageBlocks && (
            <Typography sx={{ fontSize: "20px", color: "lightgrey" }}>
              {content}
            </Typography>
          )}

          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block) =>
              isCodeBlock(block) ? (
                <SyntaxHighlighter style={coldarkDark} language={"javascript"}>
                  {block}
                </SyntaxHighlighter>
              ) : (
                <Typography sx={{ fontSize: "20px", color: "lightgrey" }}>
                  {block}
                </Typography>
              ),
            )}
        </Box>
      </Box>
    </Box>
  );
};

export { ChatItem };

import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Logo: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src={"openai1.png"}
          alt="openai"
          className={"image-inverted rotate"}
          width={"70px"}
          height={"50px"}
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>GPT</span>-CHAT
      </Typography>
    </div>
  );
};

export { Logo };

import { FC } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { TypingAnimation } from "../components/typer/TypingAnimation.tsx";
import { Footer } from "../components/footer/Footer.tsx";

const Home: FC = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src={"robot.png"}
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            src={"askme.png"}
            alt="ask me"
            className={"image-inverted"}
            style={{ width: "200px", margin: "0 auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src={"chat.png"}
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              opacity: "60%",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export { Home };

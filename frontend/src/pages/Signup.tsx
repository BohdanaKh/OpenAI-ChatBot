import React, { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { CustomizedInput } from "../components/shared/CustomizedInput.tsx";
import { useAuth } from "../components/context/AuthContext.tsx";

const Signup: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (e) {
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={8} mt={0} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src={"airobot.png"} alt="Robot" width={"500px"} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handlesubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={"h4"}
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Sign up
            </Typography>
            <CustomizedInput name={"name"} type={"name"} label={"Name"} />
            <CustomizedInput name={"email"} type={"email"} label={"Email"} />
            <CustomizedInput
              name={"password"}
              type={"password"}
              label={"Password"}
            />
            <Button
              type={"submit"}
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#40826d",
                color: "black",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Sign up
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export { Signup };

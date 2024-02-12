import { FC } from "react";
import { AppBar, Toolbar } from "@mui/material";

import { Logo } from "./shared/Logo.tsx";
import { useAuth } from "./context/AuthContext.tsx";
import { NavigationLink } from "./shared/NavigationLink.tsx";

const Header: FC = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                to={"/chat"}
                bg={"#95e0e8"}
                text={"Start Chat"}
                textColor={"black"}
              />
              <NavigationLink
                to={"/"}
                bg={"#51538f"}
                text={"Logout"}
                textColor={"white"}
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                to={"/login"}
                bg={"#95e0e8"}
                text={"Login"}
                textColor={"black"}
              />
              <NavigationLink
                to={"/signup"}
                bg={"#51538f"}
                text={"Sign up"}
                textColor={"white"}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export { Header };

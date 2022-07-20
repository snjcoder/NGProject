import React from "react";
import { AppBar, Tabs, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <Tabs  textColor="inhert">
            <Tabs label="Home" />
            <Tabs label="Map" />
            <Tabs label="About" />
            <Tabs label="Store" />
          </Tabs>
          
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;

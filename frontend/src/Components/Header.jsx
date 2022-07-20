import React from "react";
import { AppBar, Tabs, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <Tabs  textColor="inhert">
            <Tabs label="Products" />
            <Tabs label="Products" />
            <Tabs label="Products" />
            <Tabs label="Products" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;

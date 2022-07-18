import React, { useContext, useState } from "react";
import { Box, makeStyles, Avatar, TextField, Paper } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import background from "../../images/loginImage.png";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#ff9800",
  },

  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(1),
      
    },
  },
}));

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const avatarStyle = { backgroundColor: "#E74C3C" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(firstName, lastName, email, password, postalCode);
      navigate("/welcome");
      setIsPending(true);
    } catch (error) {
      setError(`Password must be minimum of 6 characters and number`);
    }
  };

  // type props = {
  //   fontColor?: "string",
  // };
  // const options = {
  //   shouldForwardProp: (prop) => prop !== "fontColor",
  // };
  // const StyledTextField =
  //   styled(TextField, options) <
  //   props >
  //   (({ fontColor }) => ({
  //     input: {
  //       color: fontColor,
  //     },
  //   }));

  // const back = {
  //   backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
  // };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        elevation={10}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(8.5px)",
          webkitBackdropFilter: "blur(8.5px)",
          borderRadius: "10px",
          color: "#ffffff",
          textTransform: "uppercase",
          letterSpacing: "0.4rem",
          mobile: { minWidth: "400", width: "80vw", height: "90vh" },
          tablet: { minWidth: "800", width: "80vw", height: "80vh" },
          desktop: { minWidth: "1000", width: "70vw", height: "50vh" },
          largeDesktop: { minWidth: "1600", width: "30vw", height: "80vh" },
        }}
      >
        <Typography variant="h5">
          <br />
          Sign Up
        </Typography>
        <Avatar style={avatarStyle}></Avatar>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            inputProps={{ className: classes.input }}
            label="First Name"
            variant="outlined"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            inputProps={{ className: classes.input }}
            label="Last Name"
            variant="filled"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            inputProps={{ className: classes.input }}
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            inputProps={{ className: classes.input }}
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            inputProps={{ className: classes.input }}
            label="Postal Code"
            variant="filled"
            type="postalCode"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Box>
        <Typography sx={{ color: "green", marginLeft: "3vw" }}>
          <br />
          <input type="checkbox" id="regulation"></input>
          By creating an account, you agree to HundieTrade Conditions of Use.{" "}
          <br />
          <br />
          <div>
            <Typography sx={{ color: "red" }}>{error}</Typography>
          </div>
          <div />
          <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <Button variant="contained">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </Box>
        </Typography>
      </Paper>
      <Typography variant="h6" sx={{ color: "green" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="contained">Login</Button>
        </Link>
      </Typography>
      <Typography variant="h5">
        <section class="a-size-mini a-color-secondary">
          © 2022, HundieTrade.com, Inc.
        </section>
      </Typography>
    </form>
  );
};

export default SignUp;

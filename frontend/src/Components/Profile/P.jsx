import React, { useState, useEffect } from "react";
import { Avatar, Grid, Input, TextField } from "@mui/material";
import { styled } from "@mui/system";

const useStyles = styled((theme) => ({
  root: {
    ".MuiFormControl-root": {
      width: "80%",
    },
  },
}));

const initialFvalues = {
  uid: user.uid,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  occupation: "",
  city: "",
  province: "",
  postalCode: "",
  matches: [],
  url: "",
  timeStamp: serverTimestamp(),
};
export const P = () => {
  const [values, setValues] = useState(initialFvalues);
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
            name="firstName"
            required={false}
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
            name="lastName"
            required={true}
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="standard"
            type="text"
            name="email"
            required={true}
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            id="outlined-basic"
            label="Occupation"
            variant="outlined"
            type="text"
            name="occupation"
            required={true}
            value={formData.occupation}
            onChange={handleChange}
          />
          <TextField
            iid="outlined-basic"
            label="City"
            variant="outlined"
            type="text"
            name="city"
            required={true}
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Province"
            variant="outlined"
            type="text"
            name="province"
            required={true}
            value={formData.province}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Postal Code"
            variant="outlined"
            type="text"
            name="postalCode"
            required={true}
            value={formData.postalCode}
            onChange={handleChange}
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            id="outlined-basic"
            label="Postal Code"
            variant="outlined"
            type="text"
            name="postalCode"
            required={true}
            value={formData.postalCode}
            onChange={handleChange}
            inputProps={{ maxLength: 3 }}
          />
          <Avatar
            src={
              file ? (
                URL.createObjectURL(file)
              ) : (
                <Typography>Image failed to load</Typography>
              )
            }
            sx={{
              bgcolor: "green"[500],
              width: 95,
              height: 100,
              marginTop: "0px",
            }}
            variant="rounded"
          />

          <Input
            id="standard-basic"
            label="Profile Photo"
            variant="standard"
            type="file"
            name="url"
            required={true}
            value={formData.url}
            onChange={handleFileChange}
          />
          {progress ? <div>progress: {progress}%</div> : <div />}
          <Button
            sx={{
              position: "absolute",
              top: "750px",
              marginLeft: "160px",
              backgroundColor: "#FAD9A1",
              width: "50px",
              display: "flex",
            }}
            disabled={progress !== null && progress < 100}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

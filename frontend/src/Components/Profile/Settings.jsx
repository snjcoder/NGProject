import React, { useContext, useState } from "react";
import { Avatar, Input, TextField, Typography, Button } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { Box, Container } from "@mui/system";
import styled from "styled-components";

const Settings = (props) => {
  const show = props.SwipCards;
  const [data, setData] = useState(show);
  const [progress, setProgress] = useState(null);

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [formData, setFormData] = useState({
    uid: user.uid,
    firstName: "",
    lastName: "",
    email: user.email,
    name: user.displayName,
    occupation: "",
    matches: [],
    province: "",
    city: "",
    postalCode: "",
    want: "",
    have: "",
    url: "",
    timeStamp: serverTimestamp(),
  });

  const handleChange = (e) => {
    console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const StyledInput = styled.input`
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border-radius: 2rem;
    width: 80%;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: #3c354e;
    font-size: 1rem;
    font-weight: bold;
    &:focus {
      display: inline-block;
      box-shadow: 0 0 0 0.2rem #b9abe0;
      backdrop-filter: blur(12rem);
      border-radius: 2rem;
    }
    &::placeholder {
      color: #b9abe099;
      font-weight: 100;
      font-size: 1rem;
    }
  `;
  return (
    <>
      <Container>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              right: "50%",
            }}
          >
            <br />
            CREATE ACCOUNT
          </Typography>
          <br />
          <section>
            <TextField
              id="First Name"
              label="First Name"
              variant="standard"
              type="text"
              name="firstName"
              required={false}
              value={formData.firstName}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="Last Name"
              label="Last Name"
              variant="standard"
              type="text"
              name="lastName"
              required={false}
              value={formData.lastName}
              onChange={handleChange}
            />
          </section>
          <section>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              type="text"
              name="email"
              required={true}
              value={formData.email}
              onChange={handleChange}
            />
            <br />

            <TextField
              id="standard-basic"
              label="Occupation"
              variant="standard"
              type="text"
              name="occupation"
              required={false}
              value={formData.occupation}
              onChange={handleChange}
            />
          </section>
          <section>
            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              type="text"
              name="city"
              required={false}
              value={formData.city}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Province"
              variant="standard"
              type="text"
              name="province"
              required={false}
              value={formData.province}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Postal Code"
              variant="standard"
              type="text"
              name="postcalCode"
              required={false}
              value={formData.postalCode}
              onChange={handleChange}
            />
          </section>
          <section>
            <Avatar
              sx={{
                bgcolor: "green"[500],
                width: 100,
                height: 100,
                marginTop: "150px",
              }}
              variant="rounded"
            ></Avatar>
            <input
              id="standard-basic"
              label="Profile Photo"
              variant="standard"
              type="file"
              name="url"
              required={true}
              value={formData.url}
              onChange={handleChange}
            />
          </section>
          <Button
            sx={{
              position: "absolute",
              top: "1450px",
              marginLeft: "300px",
              backgroundColor: "#FAD9A1",
              width: "50px",
            }}
            disabled={progress !== null && progress < 100}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Settings;

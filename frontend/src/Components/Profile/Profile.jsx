import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { styled } from "@mui/system";

const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    " .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "50px",
    },
    " .MuiButtonBase-root": {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
}));

const Profile = () => {
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(null);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [userDocument, setUserDocument] = useState(null);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const classes = useStyles();

  const [formData, setFormData] = useState({
    uid: user.uid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    province: "",
    city: "",
    postalCode: "",
    gender: "",
    occupation: "",
    matches: [],
    url: "",
    timeStamp: serverTimestamp(),
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFileChange = (e) => {
    console.log("File handle Change");
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDoc(doc(db, "users", user.uid), {
        ...formData,
        timeStamp: serverTimestamp(),
      });
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const handleImageUpload = () => {
      const name = new Date().getTime() + file.name;
      const imageRef = ref(store, name);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshort) => {
          const percentage =
            (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          console.log("Upload Error", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({
              ...prev,
              Avatar: downloadURL,
            }));
          });
        }
      );
    };
    file && handleImageUpload();
  }, [file]);

  return (
    <>
      {/* <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 1200,
          height: 500,
        },
      }}> */}
      <Paper
        elevation={3}
        sx={{ backgroundColor: "#B8F1B0", display: "flex", flexWrap: "wrap" }}
      >
        <Typography
          className={classes.root}
          variant="h7"
          sx={{
            display: "flex",
            marginLeft: "150px",
            justifyContent: "center",
          }}
        >
          <br />
          UPDATE ACCOUNT
        </Typography>

        <form
          className={classes.root}
          sx={{
            // margin: "5px",
            // paddingLeft: "70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onSubmit={handleSubmit}
        >
          <br />
          <br />
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
              sx={{ marginBottom: "15px" }}
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
              sx={{ marginBottom: "15px" }}
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
              sx={{ marginBottom: "15px" }}
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
              sx={{ marginBottom: "15px" }}
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
              sx={{ marginBottom: "15px" }}
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
              sx={{ marginBottom: "15px" }}
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
              sx={{ marginBottom: "15px" }}
            />
          </section>
          {/* <section
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
              padding: "10px",
            }}
          > */}
          {/* <TextField
              sx={{ marginBottom: "15px" }}
              id="filled-basic"
              label="First Name"
              variant="filled"
              type="text"
              name="firstName"
              required={false}
              value={formData.firstName}
              onChange={handleChange}
              inputProps={{ maxLength: 3 }}
            /> */}

          {/* <TextField
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
              label="Gender"
              variant="outlined"
              type="text"
              name="gender"
              required={true}
              value={formData.gender}
              onChange={handleChange}
            />
          </section>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
              padding: "10px",
            }}
          >
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
          </section>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
              padding: "10px",
            }}
          >
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
            /> */}
          {/* <Avatar
              src={
                file ? (
                  URL.createObjectURL(file)
                ) : (
                  <Typography>Image failed to load</Typography>
                )
              }
              sx={{
                bgcolor: "green"[500],
                width: 150,
                height: 100,
                marginTop: "30px",
              }}
            /> */}
          {/* <TextField
              id="outlined-multiline-flexible"
              label="First Name"
              variant="outlined"
              type="text"
              name="firstName"
              required={true}
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
              label="Gender"
              variant="outlined"
              type="text"
              name="gender"
              required={true}
              value={formData.gender}
              onChange={handleChange}
            />
          </section>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
              padding: "10px",
            }}
          >
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
          </section>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
              padding: "10px",
            }}
          >
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
            /> */}
          <section>
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

            <input
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
          </section>
        </form>
      </Paper>
      {/* </Box> */}
    </>
  );
};

export default Profile;

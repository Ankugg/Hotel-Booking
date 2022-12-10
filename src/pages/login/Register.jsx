import {
  TextField,
  Button,
  Alert,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../context/AuthContext";

const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [registerUser] = useRegisterUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
    };

    if (
      actualData.username &&
      actualData.email &&
      actualData.password &&
      actualData.password_confirmation
    ) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await registerUser(actualData);
        console.log(res);
        // if (res.data.status === "success") {
        //   navigate("/login");
        // }
        // if (res.data.status === "failed") {
        //   setError({ status: true, msg: res.data.message, type: "error" });
        // }
      } else {
        setError({
          status: true,
          msg: "password and confirm password does not match ",
          type: "error",
        });
      }
    } else {
      setError({
        status: true,
        msg: "all fields are required ",
        type: "error",
      });
    }
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          name="username"
          label="username"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          type="password"
          label="password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          label="confirm password"
        />

        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Register
          </Button>
        </Box>

        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
  );
};

export default Registration;

import "./login.css";
import { TextField, Button, Alert, Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { storeToken } from "../../context/LocalStorage";
import { useLoginUserMutation } from "../../context/AuthContext";
const UserLogin = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    if (actualData.username && actualData.password) {
      // console.log(actualData);
      // document.getElementById("login-form").reset();
      // setError({ status: true, msg: "login succeess", type: "success" });

      const res = await loginUser(actualData);
      console.log(res)

      if (res.data.status === "200") {
        storeToken(res.data.token);
        // navigate("/dashboard");
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: "error" });
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
        id="login-form"
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
          id="password"
          name="password"
          type="password"
          label="password"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Login
          </Button>
        </Box>
        <NavLink to="/resetemail">Forgot Password</NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
  );
};

export default UserLogin;

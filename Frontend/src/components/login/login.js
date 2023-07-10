import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, TextField, Typography } from "@mui/material";
import { useLoginUserMutation } from "../../api";
import { useDispatch } from "react-redux";
import { userActions } from "../../userReducer";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    try {
      const { data } = await loginUser(user);
      dispatch(userActions.setLoggedInUserData(data.user));
      Swal.fire({
        icon: "success",
        text: data.message,
        showConfirmButton: false,
        timer: 2000
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <div className="login">
      <Typography variant="h4" component="h1" align="center">
        Login
      </Typography>
      <TextField
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        label="Email"
        placeholder="Enter your Email"
        fullWidth
      />
      <TextField
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        label="Password"
        placeholder="Enter your Password"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      <Typography variant="body1" align="center">
        or
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate('/register')}
      >
        Register
      </Button>
    </div>
  );
};

export default Login;

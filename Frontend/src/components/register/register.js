import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, TextField, Typography } from "@mui/material";
import { useRegisterUserMutation } from "../../api";
import { useDispatch } from "react-redux";
import { userActions } from "../../userReducer";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    const { username, email, password, reEnterPassword } = user;
    if (username && email && password && password === reEnterPassword) {
      try {
        const { data } = await registerUser(user);
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
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="register">
      <Typography variant="h4" component="h1" align="center">
        Register
      </Typography>
      <TextField
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        label="Name"
        placeholder="Your Name"
        fullWidth
      />
      <TextField
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        label="Email"
        placeholder="Your Email"
        fullWidth
      />
      <TextField
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        label="Password"
        placeholder="Your Password"
        fullWidth
      />
      <TextField
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        onChange={handleChange}
        label="Re-enter Password"
        placeholder="Re-enter Password"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
      <Typography variant="body1" align="center">
        or
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default Register;

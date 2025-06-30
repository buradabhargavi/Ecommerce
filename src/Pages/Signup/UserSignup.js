import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "CUSTOMER"
      },
      address: formData.address,
      fullName:formData.username,
    };

    try {
      const response = await fetch("http://localhost:9091/customer/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Signup successful!", severity: "success" });
        setFormData({ username: "", email: "", password: "", address: "" });
        navigate("/login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed.");
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column",height:"100vh",justifyContent:"center" }}>
      <Typography sx={{ fontSize: "30px", fontWeight: 600, color: "green", mb: 2 }}>
        Customer Signup
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "500px" }}
      >
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" sx={{ background: "green" }}>
          Signup
        </Button>
         <Box sx={{textAlign:"center"}}>Already have an account?<Link to="/login">Login</Link></Box>
      </form>
    </Box>
  );
}

export default Signup;

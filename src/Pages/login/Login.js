import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "user",
    password: "Pass@123"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9091/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user_id", data.user_id);

        if (data.role === "ADMIN") {
          navigate("/admin/partners");
        } else if (data.role === "PARTNER") {
          navigate("/partner/products");
        } else {
          navigate("/customer/dashboard");
        }

      } else {
        const error = await res.json();
        alert("Login failed: " + error.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error while logging in.");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column",height:"100vh",justifyContent:"center",maxWidth:"100vw"}}>
      <Typography sx={{ fontSize: "30px", fontWeight: 600, color: "green",marginBottom:"20px" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "30px", minWidth: "300px",width:"100%",maxWidth:"500px" }}>
        <TextField label="user name" name="username" variant="outlined" value={formData.username} onChange={handleChange} />
        <TextField label="Password" name="password" type="password" variant="outlined" value={formData.password} onChange={handleChange} />
        <Button type="submit" variant="contained" sx={{ background: "green" }}>Login</Button>
        <Box sx={{textAlign:"center"}}>don't have an account?<Link to="/signup">sign up</Link></Box>
      </form>
    </Box>
  );
}

export default Login;

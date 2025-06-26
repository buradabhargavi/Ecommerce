import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPartner() {
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
        role: "PARTNER"
      },
      name: formData.username,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:9091/admin/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Add Partner successful!", severity: "success" });
        setFormData({ username: "", email: "", password: "", address: "" });
        navigate("/admin/partners");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Add Partner failed.");
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 4 }}>
      <Typography sx={{ fontSize: "30px", fontWeight: 600, color: "green", mb: 2 }}>
       Add Partner
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
        <Button type="submit" variant="contained" sx={{ background: "green" }}>
          Add Partner
        </Button>
      </form>
    </Box>
  );
}

export default AddPartner;

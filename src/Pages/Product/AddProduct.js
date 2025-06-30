import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPartner() {
  const [formData, setFormData] = useState({
    name:"",
    price:0,
    description:""
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
        name: formData.name,
        price: formData.price,
        description:formData.description,
        quantity:formData.quantity
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:9091/partner/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Add Partner successful!", severity: "success" });
        setFormData({ name:"",price:0,description:""});
        navigate("/partner/products");
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
       Add Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "500px" }}
      >
        <TextField
          label="product name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
         <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
         <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" sx={{ background: "green" }}>
          Add product
        </Button>
      </form>
    </Box>
  );
}

export default AddPartner;

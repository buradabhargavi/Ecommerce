import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("user_id"); 
  const fetchProducts = async () => {
      const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:9091/customer/products",{
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleAddToCart = async (userId, productId, quantity) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:9091/customer/add-to-cart?userId=${userId}&productId=${productId}&quantity=${quantity}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }

    const data = await response.json();
    alert("Item added to cart!");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to add to cart");
  }
};

  useEffect(() => {
    
    fetchProducts();
  }, []);

  
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ minHeight: 180,minWidth:"300px"}}>
              <CardContent sx={{display:"flex",justifyContent:"space-between"}}>
                <img src="" alt={product.name} style={{width:"200px",height:"100px"}}></img>
                <Box>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">₹{product.price}</Typography>
                <Typography color="text.secondary">{product.description}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{justifyContent:"right"}}>
                <Button
                  variant="contained"
                  onClick={() => handleAddToCart(userId,product.id,1)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;

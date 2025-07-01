import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
} from "@mui/material";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const userId = localStorage.getItem("user_id");

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:9091/customer/products", {
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

  const fetchCartItems = async () => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:9091/customer/cart?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const initialQuantities = {};
      const data = await response.json();
      data.forEach((item) => {
        initialQuantities[item.productId] = item.quantity;
      });

      setQuantities(initialQuantities);
    } catch (err) {
      console.error("Failed to fetch cart quantities", err);
    }
  };

  const handleAddToCart = async (userId, productId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:9091/customer/add-to-cart?userId=${userId}&productId=${productId}&quantity=${quantity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await response.json();
      alert("Item added to cart!");
      setQuantities(prev => ({ ...prev, [productId]: quantity }));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add to cart");
    }
  };

  const handleCartQuantityChange = async (product, change) => {
    const currentQty = quantities[product.id] || 0;
    const newQty = currentQty + change;

    if (newQty < 0 || newQty > product.quantity) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:9091/customer/cart?userId=${userId}&productId=${product.id}&quantity=${newQty}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      setQuantities(prev => {
        const updated = { ...prev };
        if (newQty === 0) {
          delete updated[product.id];
        } else {
          updated[product.id] = newQty;
        }
        return updated;
      });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };


  const handleSearch = async (event) => {
    try {
      const token = localStorage.getItem("token");
      setSearchValue(event.target.value);
      if (searchValue.length >= 2) {
        const response = await fetch(`http://localhost:9091/customer/search?name=${searchValue}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to update cart");
        }
      const data = await response.json();
       setProducts(data);
      //  if(data.length == 0){
      //   //return window.alert("no items found");
      //   return "no items found";
      //  }
 
       
      }
      else{
        fetchProducts();
      }
    }
    catch (error) {
      console.error("Error updating cart quantity:", error);
    }


  }

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, []);


  return (
    <div style={{ padding: 20 }}>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>
        <TextField value={searchValue} placeholder="search..." onChange={handleSearch}></TextField>
      </Box>
       {products.length>0 ?
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ minHeight: 220, minWidth: "300px" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <img src="" alt={product.name} style={{ width: "200px", height: "100px" }} />
                <Box>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary">₹{product.price}</Typography>
                  <Typography color="text.secondary">{product.description}</Typography>
                  {product.quantity === 0 &&
                    <Typography color="error">Out of Stock</Typography>
                  }
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "right" }}>
                {quantities[product.id] > 0 ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleCartQuantityChange(product, -1)}
                    >
                      -
                    </Button>
                    <Typography variant="body1" sx={{ minWidth: "120px", textAlign: "center" }}>
                      {quantities[product.id]}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleCartQuantityChange(product, 1)}
                      disabled={quantities[product.id] >= product.quantity}
                    >
                      +
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ background: "green" }}
                    disabled={product.quantity === 0}
                    onClick={() => handleAddToCart(userId, product.id, 1)}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>:
      
    <Typography>No products found</Typography>
      }
    </div>
    
  );
}

export default Dashboard;

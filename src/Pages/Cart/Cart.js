import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
  Box
} from "@mui/material";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartItems = async () => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:9091/customer/cart?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data);

      const total = data.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleCheckout = async () =>{
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:9091/customer/cart/${userId}`, {
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
      

      if (!response.ok) {
        throw new Error("Failed to place order]");
      }

      alert("your order will not deliver to your address soon");
      fetchCartItems();
      
    } catch (error) {
      console.error("Error in placing order:", error);
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"100vw"}}>
    <div style={{ padding: 20,maxWidth: "700px", width: "100%"}}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: 20 }}>
          🛒 Your cart is light as air! Go to products page to get some items
        </Typography>
      ) : (
        <>
          <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {cartItems.map((item, index) => (
              <Box key={index} sx={{border:"1px solid white",boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff",padding:"16px"}}>
                <Box>
                  <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant="h6">{item.productName}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                     </Box>
                    <Typography>Price: ₹{item.productPrice}</Typography>
                    
                    <Typography>Description: {item.productDescription || "No description"}</Typography>
                  </Box>
              </Box>    
            ))}
          </Box>

          <Divider style={{ margin: "20px 0" }} />
          <Box sx={{display:"flex",justifyContent:"space-between"}}>
         <Box>
          <Typography variant="h5"> Total: ₹{totalPrice}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Thanks for shopping with us!
          </Typography>
          </Box>
            <Button color="inherit" variant="contained" sx={{height:"50px"}} onClick={()=>handleCheckout()}>Check out</Button>
          </Box>
        </>
      )}
    </div>
    </Box>
  );
}

export default Cart;

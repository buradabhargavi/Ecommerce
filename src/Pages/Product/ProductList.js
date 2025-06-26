import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const fetchProducts = async () => {
    console.log("Token before fetch:", token);
    try {
      const response = await fetch("http://localhost:9091/partner/products", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch Products", err);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`http://localhost:9091/partner/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProducts(Products.filter(p => p.id !== productId));
      } else {
        console.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <Button variant="contained" color="primary" onClick={() => navigate("/partner/add-product")}>
        Add product
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>product ID</TableCell>
              <TableCell>name</TableCell>
              <TableCell>price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {Products.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No Products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductList;

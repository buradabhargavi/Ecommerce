import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PartnersList() {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchPartners = async () => {
    try {
      const response = await fetch("http://localhost:9091/admin/partners", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPartners(data);
    } catch (err) {
      console.error("Failed to fetch partners", err);
    }
  };

  const deletePartner = async (partnerId) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) return;

    try {
      const response = await fetch(`http://localhost:9091/admin/partners/${partnerId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPartners(partners.filter(p => p.id !== partnerId));
      } else {
        console.error("Failed to delete partner");
      }
    } catch (err) {
      console.error("Error deleting partner", err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div>
      <h2>Partners List</h2>
      <Button variant="contained" color="primary" onClick={() => navigate("/admin/add-partner")} sx={{background:"green"}}>
        Add Partner
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Partner ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>{partner.id}</TableCell>
                <TableCell>{partner.name}</TableCell>
                <TableCell>{partner.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deletePartner(partner.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {partners.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No partners found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PartnersList;

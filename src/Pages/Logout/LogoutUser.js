import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setOpen(false);
    navigate("/login");
  };
  return (
    <>
    <Button onClick={() => setOpen(true)} color="inherit">Logout</Button>
      <LogoutConfirm
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
      </>
  );
}

function LogoutConfirm({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">Logout</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Logout;

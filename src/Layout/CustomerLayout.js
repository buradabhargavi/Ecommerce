import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Logout from "../Pages/Logout/LogoutUser";

function CustomerLayout() {
  return (
    <>
      <AppBar position="static" sx={{background:"green"}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Customer Panel</Typography>
          <Button color="inherit" component={Link} to="/customer/dashboard">Shop</Button>
          <Button color="inherit" component={Link} to="/customer/cart">Cart</Button>
         <Logout/>
        </Toolbar>
      </AppBar>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default CustomerLayout;

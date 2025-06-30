import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Logout from "../Pages/Logout/LogoutUser";

function PartnerLayout() {
  return (
    <>
      <AppBar position="static" sx={{background:"green"}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Partner Panel</Typography>
          <Button color="inherit" component={Link} to="/partner/add-product">add Product</Button>
          <Button color="inherit" component={Link} to="/partner/products">Products</Button>
          <Logout/>
        </Toolbar>
      </AppBar>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default PartnerLayout;

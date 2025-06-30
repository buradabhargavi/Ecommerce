import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Logout from "../Pages/Logout/LogoutUser";

function AdminLayout() {
  return (
    <>
      <AppBar position="static" sx={{background:"green"}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Panel</Typography>
          <Button color="inherit" component={Link} to="/admin/add-partner">Add Partner</Button>
          <Button color="inherit" component={Link} to="/admin/partners">Partners</Button>
          <Logout/>
        </Toolbar>
      </AppBar>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;

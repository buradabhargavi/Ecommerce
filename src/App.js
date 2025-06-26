import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/login/Login';
import Signup from './Pages/Signup/UserSignup';
import AddPartner from './Pages/Partner/AddPartner';
import AddProduct from './Pages/Product/AddProduct';
import PartnerLayout from "./Layout/PartnerLayout";
import CustomerLayout from "./Layout/CustomerLayout";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PartnersList from "./Pages/Partner/PartnersList";
import ProductList from "./Pages/Product/ProductList";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="add-partner" element={<AddPartner />} />
          <Route path="partners" element={<PartnersList />} />
        </Route>



        <Route path="/partner" element={
          <ProtectedRoute allowedRoles={["PARTNER"]}>
            <PartnerLayout />
          </ProtectedRoute>
        }>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
        </Route>


        <Route path="/customer" element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cart" element={<Cart />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

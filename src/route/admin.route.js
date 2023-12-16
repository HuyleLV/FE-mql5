import { Route, Routes } from "react-router-dom";
import Admin from "../page/admin";
import UsersDashboard from "../page/admin/users";
import UserDetail from "../page/admin/users/detail";
import ProductsDashboard from "../page/admin/products";
import MenusDashboard from "../page/admin/menus";
import CommentsDashboard from "../page/admin/comments";
import PaymentsDashboard from "../page/admin/payments";

export default function AdminRouter () {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UsersDashboard />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/products" element={<ProductsDashboard />} />
        <Route path="/admin/menus" element={<MenusDashboard />} />
        <Route path="/admin/comments" element={<CommentsDashboard />} />
        <Route path="/admin/payments" element={<PaymentsDashboard />} />
      </Routes>
    );
  };
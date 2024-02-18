import { Route, Routes } from "react-router-dom";
import Admin from "../page/admin";
import UsersDashboard from "../page/admin/users";
import UserDetail from "../page/admin/users/detail";
import ProductsDashboard from "../page/admin/products";
import ProductsDetail from "../page/admin/products/detail";
import CommentsDashboard from "../page/admin/comments";
import PaymentsDashboard from "../page/admin/payments";
import CategoriesDashboard from "../page/admin/categories";
import CategoriesDetail from "../page/admin/categories/detail";
import CategoryChildDashboard from "../page/admin/categoryChild";
import CategoryChilDetail from "../page/admin/categoryChild/detail";
import TransferDashboard from "../page/admin/transfer";
import LicensesDashboard from "../page/admin/licenses";
import MasterDashboard from "../page/admin/master";
import MasterDetail from "../page/admin/master/detail";

export default function AdminRouter () {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UsersDashboard />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/products" element={<ProductsDashboard />} />
        <Route path="/admin/products/:id" element={<ProductsDetail />} />
        <Route path="/admin/categories" element={<CategoriesDashboard />} />
        <Route path="/admin/categories/:id" element={<CategoriesDetail />} />
        <Route path="/admin/categoryChild" element={<CategoryChildDashboard />} />
        <Route path="/admin/categoryChild/:id" element={<CategoryChilDetail />} />
        <Route path="/admin/licenses" element={<LicensesDashboard />} />
        <Route path="/admin/master" element={<MasterDashboard />} />
        <Route path="/admin/master/:id" element={<MasterDetail />} />
        <Route path="/admin/comments" element={<CommentsDashboard />} />
        <Route path="/admin/transfer" element={<TransferDashboard />} />
      </Routes>
    );
  };
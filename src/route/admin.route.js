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
import IdentifyDashboard from "../page/admin/identify";
import IdentifyDetail from "../page/admin/identify/detail";
import IdentifyCategory from "../page/admin/identifyCategory";
import IdentifyCategoryDetail from "../page/admin/identifyCategory/detail";
import EducationDashboard from "../page/admin/education";
import EducationDetail from "../page/admin/education/detail";
import EducationCategory from "../page/admin/education/category";
import EducationCategoryDetail from "../page/admin/education/category/detail";
import EducationCategoryChild from "../page/admin/education/category_child";
import EducationCategoryChildDetail from "../page/admin/education/category_child/detail";
import NewsDashboard from "../page/admin/news";
import ShortDashboard from "../page/admin/short";
import ShortDetail from "../page/admin/short/detail";
import ReportDashboard from "../page/admin/report";
import ReportDetail from "../page/admin/report/detail";

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
        <Route path="/admin/identify" element={<IdentifyDashboard />} />
        <Route path="/admin/identify/:id" element={<IdentifyDetail />} />
        <Route path="/admin/identify-category" element={<IdentifyCategory />} />
        <Route path="/admin/identify-category/:id" element={<IdentifyCategoryDetail />} />
        <Route path="/admin/news" element={<NewsDashboard />} />
        <Route path="/admin/education" element={<EducationDashboard />} />
        <Route path="/admin/education/:id" element={<EducationDetail />} />
        <Route path="/admin/education-category" element={<EducationCategory />} />
        <Route path="/admin/education-category/:id" element={<EducationCategoryDetail />} />
        <Route path="/admin/education-categorychild" element={<EducationCategoryChild />} />
        <Route path="/admin/education-categorychild/:id" element={<EducationCategoryChildDetail />} />
        <Route path="/admin/licenses" element={<LicensesDashboard />} />  
        <Route path="/admin/master" element={<MasterDashboard />} />
        <Route path="/admin/master/:id" element={<MasterDetail />} />
        <Route path="/admin/comments" element={<CommentsDashboard />} />
        <Route path="/admin/transfer" element={<TransferDashboard />} />
        <Route path="/admin/short" element={<ShortDashboard />} />
        <Route path="/admin/short/:id" element={<ShortDetail />} />
        <Route path="/admin/report" element={<ReportDashboard />} />
        <Route path="/admin/report/:id" element={<ReportDetail />} />
      </Routes>
    );
  };
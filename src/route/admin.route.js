import { Route, Routes } from "react-router-dom";
import Admin from "../page/admin";
import UsersDashboard from "../page/admin/users";
import UserDetail from "../page/admin/users/detail";
import ProductsDashboard from "../page/admin/products";
import ProductsDetail from "../page/admin/products/detail";
import CommentsDashboard from "../page/admin/comments";
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
import SignalDashboard from "../page/admin/signal";
import NotificationDashboard from "../page/admin/notification";
import NotificationDetail from "../page/admin/notification/detail";
import VpsDashboard from "../page/admin/vps";
import VpsDetail from "../page/admin/vps/detail";
import FollowerDraftDashboard from "../page/admin/followerDraft";
import ProductPageDashboard from "../page/admin/products/productPage";
import ReportCategoryDashboard from "../page/admin/report/category";
import ReportCategoryDetail from "../page/admin/report/category/detail";
import NotificationUpdate from "../page/admin/notification/update";
import IndicatorNewsDashboard from "../page/admin/indicatorNews";
import IndicatorNewsDetail from "../page/admin/indicatorNews/detail";
import EconomicNewsDashboard from "../page/admin/economicNews";
import EconomicNewsDetail from "../page/admin/economicNews/detail";
import TradingSymtemDashboard from "../page/admin/tradingSystem";
import TradingSystemDetail from "../page/admin/tradingSystem/detail";

export default function AdminRouter () {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UsersDashboard />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/notification" element={<NotificationDashboard />} />
        <Route path="/admin/notification/create" element={<NotificationDetail />} />
        <Route path="/admin/notification/:id" element={<NotificationUpdate />} />
        <Route path="/admin/products" element={<ProductsDashboard />} />
        <Route path="/admin/products/:id" element={<ProductsDetail />} />
        <Route path="/admin/product-page" element={<ProductPageDashboard />} />
        <Route path="/admin/signal" element={<SignalDashboard />} />
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
        <Route path="/admin/vps" element={<VpsDashboard />} />
        <Route path="/admin/vps/:id" element={<VpsDetail />} />
        <Route path="/admin/follower-draft" element={<FollowerDraftDashboard />} />
        <Route path="/admin/short" element={<ShortDashboard />} />
        <Route path="/admin/short/:id" element={<ShortDetail />} />
        <Route path="/admin/report" element={<ReportDashboard />} />
        <Route path="/admin/report/:id" element={<ReportDetail />} />
        <Route path="/admin/report-category" element={<ReportCategoryDashboard />} />
        <Route path="/admin/report-category/:id" element={<ReportCategoryDetail />} />
        <Route path="/admin/indicator-news" element={<IndicatorNewsDashboard />} />
        <Route path="/admin/indicator-news/:id" element={<IndicatorNewsDetail />} />
        <Route path="/admin/economic-news" element={<EconomicNewsDashboard />} />
        <Route path="/admin/economic-news/:id" element={<EconomicNewsDetail />} />
        <Route path="/admin/trading-system" element={<TradingSymtemDashboard />} />
        <Route path="/admin/trading-system/:id" element={<TradingSystemDetail />} />
      </Routes>
    );
  };
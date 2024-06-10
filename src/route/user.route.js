import { Route, Routes } from "react-router-dom";
import Market from "../page/market";
import MarketDetail from "../page/market/detail";
import Login from "../page/login";
import LoginAdmin from "../page/admin/login";
import ProfilePage from "../page/profile";
import Register from "../page/register";
import AcceptEmail from "../page/acceptEmail";
import Category from "../page/market/category";
import CategoryDetail from "../page/market/category/detail";
import Home from "../page/home";
import Identify from "../page/identify";
import News from "../page/news";
import NewsDetail from "../page/news/detail";
import Education from "../page/education";
import EducationDetail from "../page/education/detail";
import Wallet from "../page/wallet";
import HomeDetail from "../page/home/detail";
import SignalPage from "../page/signal";
import ReportDetail from "../page/home/ReportDetail";
import Product from "../page/product";
import MasterDetail from "../page/master/detail";
import ForgotPassword from "../page/forgotPassword";
import Fund from "../page/fund";
import EcoCalendar from "../page/identify/ecoCalendar";
import EcoNewsDetail from "../page/identify/ecoNewsDetail";

export default function User () {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-detail" element={<HomeDetail />} />
        <Route path="/san-pham" element={<Product />} />
        <Route path="/quy" element={<Fund />} />
        <Route path="/signal" element={<SignalPage />} />
        <Route path="/master/:master_key" element={<MasterDetail />} />
        <Route path="/market" element={<Market />} />
        <Route path="/nhan-dinh" element={<Identify />} />
        <Route path="/lich-kinh-te" element={<EcoCalendar />} />
        <Route path="/lich-kinh-te/:economic_news_slug" element={<EcoNewsDetail />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/tin-tuc/:identify_slug" element={<NewsDetail />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/:education_slug" element={<EducationDetail />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quen-mat-khau" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/accept" element={<AcceptEmail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/category/:category_id" element={<Category />} />
        <Route path="/category-child/:category_id/:categoryChild_id" element={<CategoryDetail />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/report/:report_slug" element={<ReportDetail />} />
      </Routes>
    );
  };
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

export default function User () {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-detail" element={<HomeDetail />} />
        <Route path="/signal" element={<SignalPage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/nhan-dinh" element={<Identify />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/tin-tuc/:identify_slug" element={<NewsDetail />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/:education_slug" element={<EducationDetail />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/accept" element={<AcceptEmail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/category/:category_id" element={<Category />} />
        <Route path="/category-child/:category_id/:categoryChild_id" element={<CategoryDetail />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
      </Routes>
    );
  };
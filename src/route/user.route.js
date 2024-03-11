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

export default function User () {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/nhan-dinh" element={<Identify />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/tin-tuc/:identify_slug" element={<NewsDetail />} />
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
import { Route, Routes } from "react-router-dom";
import Market from "../page/market";
import MarketDetail from "../page/market/detail";
import Login from "../page/login";
import LoginAdmin from "../page/admin/login";
import ProfilePage from "../page/profile";
import Register from "../page/register";
import AcceptEmail from "../page/acceptEmail";
import Category from "../page/market/category";

export default function User () {
    return (
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/:id" element={<Market />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/accept" element={<AcceptEmail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/market/:id/" element={<MarketDetail />} />
        <Route path="/category/:category_id" element={<Category />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
      </Routes>
    );
  };
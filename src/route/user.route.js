import { Route, Routes } from "react-router-dom";
import Market from "../page/market";
import MarketDetail from "../page/market/detail";
import Login from "../page/login";
import LoginAdmin from "../page/admin/login";

export default function User () {
    return (
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/:id" element={<Market />} />
        <Route path="/login" element={<Login />} />
        <Route path="/market/:id/" element={<MarketDetail />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
      </Routes>
    );
  };
import { Route, Routes } from "react-router-dom";
import Market from "../page/market";
import MarketDetail from "../page/marketDetail";
import Login from "../page/Login";

export default function User () {
    return (
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/login" element={<Login />} />
        <Route path="/market/detail/" element={<MarketDetail />} />
        {/* <Route path="/lesson/detail/:lesson_id" element={<LessonDetail />} />
        <Route path="/lesson/speaking/:lesson_id" element={<Speaking />} /> */}
      </Routes>
    );
  };
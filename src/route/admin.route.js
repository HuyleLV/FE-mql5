import { Route, Routes } from "react-router-dom";
import Admin from "../page/admin";

export default function AdminRouter () {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    );
  };
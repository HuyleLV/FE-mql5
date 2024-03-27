import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Dashboard from "./dashboard";
import { useNavigate } from "react-router-dom";


export default function AdminPage() {

    const [cookies, setCookie, removeCookie] = useCookies(['admin']);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies?.admin?.role !== 2) {
            navigate("/loginAdmin");
        }
    }, [cookies?.admin?.role]);

    return (
        cookies?.admin?.role != 2 ? null :
            <Dashboard />
    )
}
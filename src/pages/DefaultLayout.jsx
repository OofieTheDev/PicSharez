import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function DefaultLayout({ user }) {
    return (
        <>
            <NavBar user={user} />
            <Outlet />
            <Footer />
        </>
        
    )
}
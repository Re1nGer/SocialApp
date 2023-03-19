import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

const Layout = (): JSX.Element => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
     );
}

export default Layout;
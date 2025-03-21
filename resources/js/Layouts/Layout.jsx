import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import Navbar from "@/components/Navbar.jsx";
import {useSelector} from "react-redux";

const Layout = ({children}) => {
    const {mode} = useSelector((state) => state.themeMode);
    return (
        <>
            <Header/>
            <div className={mode}>
                <main className="main">
                    <Navbar />
                    {children}
                    <Footer/>
                </main>
            </div>


        </>
    );
};

export default Layout;

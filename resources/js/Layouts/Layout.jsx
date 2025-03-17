import Header from "@/components/Header.jsx";
import {useSelector} from "react-redux";
import Footer from "@/components/Footer.jsx";

const Layout = ({children}) => {
    const {mode} = useSelector((state) => state.themeMode);
    return (
        <>
            <Header />
            <div className={mode}>
                <main className="main">
                    {children}
                    <Footer />
                </main>
            </div>


        </>
    );
};

export default Layout;

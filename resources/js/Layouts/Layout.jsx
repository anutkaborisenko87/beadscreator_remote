import Header from "@/components/Header.jsx";
import {useSelector} from "react-redux";

const Layout = ({children}) => {
    const {mode} = useSelector((state) => state.themeMode);
    return (
        <>
            <Header />
            <div className={mode}>
                <main className="main">
                    {children}
                </main>
            </div>


        </>
    );
};

export default Layout;

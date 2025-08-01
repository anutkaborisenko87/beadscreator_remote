import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import Navbar from "@/components/Navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setUser} from "../store/authUserSlice.js";
import Modal from "../components/Modal.jsx";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import {usePage} from "@inertiajs/react";
import FlashAlert from "@/components/FlashAllert.jsx";
import {openCloseModal} from "@/store/modalSlice.js";
import UpdateProfileForm from "@/components/UpdateProfileForm.jsx";

const Layout = ({children}) => {
    const props = usePage().props;
    const dispatch = useDispatch();
    const { url } = usePage();
    const {mode} = useSelector((state) => state.themeMode);
    const {modalMode} = useSelector((state) => state.modal);
    useEffect(() => {
        const user = props.user;
        dispatch(setUser(user))
    }, [children]);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('modal') === 'login') {
            dispatch(openCloseModal({ open: true, mode: 'login' }));
        }
    }, [url, dispatch]);

    return (
        <>
            <Modal>
                {modalMode === 'login' && <LoginForm />}
                {modalMode === 'register' && <RegisterForm />}
                {modalMode === 'update_profile' && <UpdateProfileForm />}
            </Modal>
            <Header/>
            <div className={mode}>
                <main className="main">
                    <FlashAlert/>
                    <Navbar />
                    {children}
                    <Footer/>

                </main>
            </div>


        </>
    );
};

export default Layout;

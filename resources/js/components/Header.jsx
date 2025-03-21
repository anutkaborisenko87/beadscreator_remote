import {Link} from "@inertiajs/react";
import {useWindowSize} from "react-use";
import logo from '../../images/sitelogo.png';
import LocaleSettingsProfile from "@/components/LocaleSettingsProfile.jsx";

const Header = () => {
    const {width} = useWindowSize();

    return (
        <header className="h-full-header">
            <nav className="flex items-center mx-full-screen text-header-elements">
                <Link href="/">
                    <img src={logo} alt="logo" className="h-full-header-image"/>
                </Link>
                { width > 700 ?
                    <div className="text-center mx-auto w-2/3">
                        <h1 className="text-[calc(100vw*0.03)] font-bold">
                            Ласкаво просимо у світ креативності з бісером!
                        </h1>
                    </div>
                    : <></>
                }
                <LocaleSettingsProfile classPrefix="header"/>
            </nav>
        </header>
    );
};

export default Header;

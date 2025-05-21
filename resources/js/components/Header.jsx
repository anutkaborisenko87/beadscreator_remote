import {Link, usePage} from "@inertiajs/react";
import {useWindowSize} from "react-use";
import logo from '../../images/sitelogo.png';
import LocaleSettingsProfile from "@/components/LocaleSettingsProfile.jsx";
import {useSelector} from "react-redux";

const Header = () => {
    const {locale} = usePage().props;
    const {width} = useWindowSize();
    const user = useSelector(state => state.authUser);
    const mainUrl = user.user?.roles?.name === 'super_admin' ? '/admin_beadscreator' : `/${locale}`

    return (
        <header className="h-full-header">
            <nav className="flex items-center mx-full-screen text-header-elements">
                {mainUrl === '/admin_beadscreator' ? (
                    <a
                        href={mainUrl}
                        className="h-full-header-image"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={logo} alt="logo" className="h-full-header-image" />
                    </a>
                ) : (
                    <Link href={mainUrl} className="h-full-header-image">
                        <img src={logo} alt="logo" className="h-full-header-image" />
                    </Link>
                )}
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

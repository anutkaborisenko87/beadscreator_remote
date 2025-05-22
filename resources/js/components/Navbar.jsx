import {Link, usePage} from "@inertiajs/react";
import {useWindowSize} from "react-use";
import Icon from "@/components/Icon.jsx";
import {useSelector} from "react-redux";
import {useState} from "react";

const Navbar = () => {
    const {url, locale, nav_menu} = usePage().props;
    const {width} = useWindowSize();
    const {mode} = useSelector((state) => state.themeMode);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const isActive = (href) => {
        if (url === '' && href === '/') {
            return true;
        }
        return url === href;
    }
    const renderNavLink = (item, extraClasses = '', onClick = () => {}) => (
        <li
            key={item.id}
            className={`nav-bar-link ${extraClasses} ${
                isActive(item.href) ? 'navbar-active-tab' : 'navbar-not-active-tab'
            }`}
        >
            <Link
                className={`no-underline text-[1.5em] ${
                    isActive(item.href)
                        ? 'navbar-text-active-tab'
                        : 'navbar-text-not-active-tab'
                }`}
                href={`${locale !== '' ? `/${locale}${item.href}` : item.href}`}
                onClick={onClick}
            >
                {item.title}
            </Link>
        </li>
    );

    return (
        <>
            <nav>
                <ul className="flex w-5/6 mx-auto my-0 justify-between relative">
                    {width > 900 ? (
                        nav_menu.map((item) =>
                            renderNavLink(item, `w-1/${nav_menu.length}`)
                        )
                    ) : (
                        <>
                            {nav_menu
                                .filter((item) => isActive(item.href))
                                .map((item) => renderNavLink(item, 'w-5/6'))}

                            <li className="w-1/6 cursor-pointer">
                                <Icon
                                    name="burger_menu"
                                    color={
                                        mode === '' || mode === 'positive'
                                            ? '#013341'
                                            : '#49ABC7'
                                    }
                                    background={
                                        mode === '' || mode === 'positive'
                                            ? '#49ABC7'
                                            : '#013341'
                                    }
                                    size={65}
                                    onClick={() =>
                                        setIsMobileMenuVisible(!isMobileMenuVisible)
                                    }
                                />

                                {isMobileMenuVisible && (
                                    <ul
                                        className="flex flex-col w-full mx-auto my-0 justify-between"
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            zIndex: 1000
                                        }}
                                    >
                                        {nav_menu
                                            .filter((item) => !isActive(item.href))
                                            .map((item) =>
                                                renderNavLink(item, 'bg-menu-link-light-positive', () =>
                                                    setIsMobileMenuVisible(false)
                                                )
                                            )}
                                    </ul>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;

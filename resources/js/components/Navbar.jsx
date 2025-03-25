import {Link, usePage} from "@inertiajs/react";
import {useWindowSize} from "react-use";
import Icon from "@/components/Icon.jsx";
import {useSelector} from "react-redux";
import {useState} from "react";

const Navbar = () => {
    const {url} = usePage();
    const {width} = useWindowSize();
    const {mode} = useSelector((state) => state.themeMode);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const isActive = (href) => {
        return url === href;
    }
    return (
        <>
            <nav>
                <ul className={'flex w-5/6 mx-auto my-0 justify-between position-relative'}>
                    {width > 900 ?
                        <>
                            <li className={`nav-bar-link w-1/4
                                ${isActive('/') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                <Link className={`no-underline text-[1.5em]
                                    ${isActive('/') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                      href={'/'}>Головна</Link>
                            </li>
                            <li className={`nav-bar-link w-1/4
                                ${isActive('/galery') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                <Link className={`no-underline text-[1.5em]
                                    ${isActive('/galery') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                      href={'/galery'}>Галерея</Link>
                            </li>
                            <li className={`nav-bar-link w-1/4
                                ${isActive('/aboutus') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                <Link className={`no-underline text-[1.5em]
                                    ${isActive('/aboutus') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                      href={'/aboutus'}>Про нас</Link>
                            </li>
                            <li className={`nav-bar-link w-1/4
                                ${isActive('/editor') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                <Link className={`no-underline text-[1.5em]
                                    ${isActive('/editor') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                      href={'/editor'}>Редактор схем</Link>
                            </li>
                        </>


                        : <>
                            {
                                isActive('/') &&
                                <li className={`nav-bar-link w-5/6
                                    ${isActive('/') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                    <Link className={`no-underline text-[1.5em]
                                        ${isActive('/') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                          href={'/'}>Головна</Link>
                                </li>
                            }
                            {
                                isActive('/galery') &&
                                <li className={`nav-bar-link w-5/6
                                    ${isActive('/galery') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                    <Link className={`no-underline text-[1.5em]
                                        ${isActive('/galery') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                          href={'/galery'}>Галерея</Link>
                                </li>}
                            {
                                isActive('/aboutus') &&
                                <li className={`nav-bar-link w-5/6
                                    ${isActive('/aboutus') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                    <Link className={`no-underline text-[1.5em]
                                        ${isActive('/aboutus') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                          href={'/aboutus'}>Про нас</Link></li>}
                            {
                                isActive('/editor') &&
                                <li className={`nav-bar-link w-5/6
                                    ${isActive('/editor') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                    <Link className={`no-underline text-[1.5em]
                                        ${isActive('/editor') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                          href={'/editor'}>Редактор схем</Link></li>
                            }
                            <li className={`w-1/6 cursor-pointer`}>
                                <Icon name={'burger_menu'}
                                      color={mode === '' || mode === 'positive' ? '#013341' : '#49ABC7'}
                                      background={mode === '' || mode === 'positive' ? '#49ABC7' : '#013341'}
                                      size={65}
                                      onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
                                />
                                {isMobileMenuVisible &&
                                    <ul className={'flex flex-col w-full mx-auto my-0 justify-between'}
                                        style={{position: 'absolute', top: '100%', left: 0, zIndex: 1000}}>
                                        {
                                            !isActive('/') &&
                                            <li className={`nav-bar-link
                                                ${isActive('/') ? 'navbar-active-tab' : 'bg-menu-link-light-positive'}`}>
                                                <Link className={`no-underline text-[1.5em]
                                                        ${isActive('/') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                                      href={'/'}>Головна</Link>
                                            </li>
                                        }
                                        {
                                            !isActive('/galery') &&
                                            <li className={`nav-bar-link
                                                ${isActive('/galery') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                                <Link className={`no-underline text-[1.5em]
                                                        ${isActive('/galery') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                                      href={'/galery'}>Галерея</Link>
                                            </li>
                                        }
                                        {
                                            !isActive('/aboutus') &&
                                            <li className={`nav-bar-link
                                                ${isActive('/aboutus') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                                <Link className={`no-underline text-[1.5em]
                                                    ${isActive('/aboutus') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                                      href={'/aboutus'}>Про нас</Link>
                                            </li>
                                        }
                                        {
                                            !isActive('/editor') &&
                                            <li className={`nav-bar-link
                                                ${isActive('/editor') ? 'navbar-active-tab' : 'navbar-not-active-tab'}`}>
                                                <Link className={`no-underline text-[1.5em]
                                                    ${isActive('/editor') ? 'navbar-text-active-tab' : 'navbar-text-not-active-tab'}`}
                                                      href={'/editor'}>Редактор схем</Link>
                                            </li>
                                        }

                                    </ul>
                                }
                            </li>
                        </>}


                </ul>

            </nav>

        </>
    );
};

export default Navbar;

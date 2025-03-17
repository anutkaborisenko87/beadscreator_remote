import {Link} from "@inertiajs/react";
import Icon from "@/components/Icon.jsx";
import SettingsDropdown from "@/components/SetttingsDropdown.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useWindowSize} from "react-use";
import {useState} from "react";
import {setTheme} from "@/store/themeSlice.js";
import LocaleDropdown from "@/components/LocaleDropdown.jsx";
import logo from '../../images/sitelogo.png';
import ProfileLinksDropdown from "@/components/ProfileLinksDropdown.jsx";

const Header = () => {
    const dispatch = useDispatch();
    const {width} = useWindowSize();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLocaleOpen, setIsLocaleOpen] = useState(false);
    const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
    const {mode} = useSelector((state) => state.themeMode);
    const iconName = mode === 'dark' ? 'night' : mode === 'negative' ? 'negative' : mode === 'positive' ? 'positive' : 'light';
    const changeTheme = (mode) => {
        dispatch(setTheme(mode));
        setIsSettingsOpen(false);
    }

    const handleOpenCloseDropdown = (view) => {
        if (view === 'settings') {
            setIsSettingsOpen(!isSettingsOpen);
            setIsLocaleOpen(false);
            setIsProfileSettingsOpen(false);
        }
        if (view === 'locale') {
            setIsLocaleOpen(!isLocaleOpen);
            setIsSettingsOpen(false);
            setIsProfileSettingsOpen(false);
        }
        if (view === 'profile') {
            setIsProfileSettingsOpen(!isProfileSettingsOpen);
            setIsLocaleOpen(false);
            setIsSettingsOpen(false);
        }
    }
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

                <div className="flex items-center justify-center mx-auto w-1/3 gap-[3em]">
                    <div className="flex items-center cursor-pointer position-relative">
                        <Icon color='#A7DCEB' name="globe" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}
                        onClick={() => handleOpenCloseDropdown('locale')}></Icon>
                        <h3 onClick={() => handleOpenCloseDropdown('locale')}>UA</h3>
                        {isLocaleOpen && <LocaleDropdown />}
                    </div>
                    <div className="flex items-center cursor-pointer position-relative">
                        <Icon color='#A7DCEB' name="settings" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}></Icon>
                        <div className="flex flex-col items-center justify-center">
                            <Icon color='#A7DCEB' name={iconName} size="15" />
                            <Icon color='#A7DCEB'
                                  onClick={() => handleOpenCloseDropdown('settings')}
                                  name="arrowDown" size={width > 1500 ? 25 : (width > 700 ? 18 : 12)} />
                        </div>
                        { isSettingsOpen && <SettingsDropdown onHandleClick={changeTheme}/>}
                    </div>
                    <div className="flex items-center cursor-pointer position-relative">
                        <Icon color='#A7DCEB' name="person" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}></Icon>
                        <Icon color='#A7DCEB' name="arrowDown" size={width > 1500 ? 25 : (width > 700 ? 18 : 12)}
                        onClick={() => handleOpenCloseDropdown('profile')}
                        ></Icon>
                        { isProfileSettingsOpen && <ProfileLinksDropdown />}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

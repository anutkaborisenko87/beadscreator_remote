import Icon from "@/components/Icon.jsx";
import LocaleDropdown from "@/components/LocaleDropdown.jsx";
import SettingsDropdown from "@/components/SetttingsDropdown.jsx";
import ProfileLinksDropdown from "@/components/ProfileLinksDropdown.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useWindowSize} from "react-use";
import {useState} from "react";
import {setTheme} from "@/store/themeSlice.js";

const LocaleSettingsProfile = ({classPrefix}) => {
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
        console.log(view);
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
        <div className={`flex items-center justify-center mx-auto w-1/3 ${width > 1060 ? 'gap-[3em]' : 'gap-[0.5em]'}`}>
            <div className="flex items-center cursor-pointer position-relative">
                <Icon
                    color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                    name="globe" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}
                    onClick={() => handleOpenCloseDropdown('locale')}></Icon>
                <h3 onClick={() => handleOpenCloseDropdown('locale')}>UA</h3>
                {isLocaleOpen && <LocaleDropdown classPrefix={classPrefix}/>}
            </div>
            <div className="flex items-center cursor-pointer position-relative">
                <Icon
                    color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                    name="settings" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}></Icon>
                <div
                    className={`flex flex-col items-center justify-center ${classPrefix === 'footer' ? 'transform-rotate-180' : ''}`}>
                    <Icon
                        color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                        name={iconName} size="15"/>
                    <Icon
                        color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                        onClick={() => handleOpenCloseDropdown('settings')}
                        name="arrowDown" size={width > 1500 ? 25 : (width > 700 ? 18 : 12)}/>
                </div>
                {isSettingsOpen && <SettingsDropdown onHandleClick={changeTheme} classPrefix={classPrefix}/>}
            </div>
            <div className="flex items-center cursor-pointer position-relative">
                <Icon
                    color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                    name="person" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}></Icon>
                <Icon
                    color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                    name="arrowDown" size={width > 1500 ? 25 : (width > 700 ? 18 : 12)}
                    onClick={() => handleOpenCloseDropdown('profile')}
                    className={classPrefix === 'footer' ? 'transform-rotate-180' : ''}
                ></Icon>
                {isProfileSettingsOpen && <ProfileLinksDropdown classPrefix={classPrefix}/>}
            </div>
        </div>
    );
};

export default LocaleSettingsProfile;

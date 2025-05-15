import Icon from "@/components/Icon.jsx";
import LocaleDropdown from "@/components/LocaleDropdown.jsx";
import SettingsDropdown from "@/components/SetttingsDropdown.jsx";
import ProfileLinksDropdown from "@/components/ProfileLinksDropdown.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useWindowSize} from "react-use";
import {setTheme} from "@/store/themeSlice.js";
import DropdownWrapper from "./DropdownWrapper.jsx";
import {useEffect, useState} from "react";
import {usePage} from "@inertiajs/react";

const LocaleSettingsProfile = ({classPrefix}) => {
    const dispatch = useDispatch();
    const {current_lang} = usePage().props;
    const {width} = useWindowSize();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLocaleOpen, setIsLocaleOpen] = useState(false);
    const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
    const {mode} = useSelector((state) => state.themeMode);
    const {isOpen} = useSelector((state) => state.modal);
    const iconName = mode === 'dark' ? 'night' : mode === 'negative' ? 'negative' : mode === 'positive' ? 'positive' : 'light';
    const changeTheme = (mode) => {
        dispatch(setTheme(mode));
        setIsSettingsOpen(false);
    }
    useEffect(() => {
        if (isOpen) {
            setIsSettingsOpen(false);
            setIsLocaleOpen(false);
            setIsProfileSettingsOpen(false);
        }
    }, [isOpen]);

    return (
        <div className={`flex items-center justify-center mx-auto w-1/3 ${width > 1060 ? 'gap-[3em]' : 'gap-[0.5em]'}`}>
            <div className="flex items-center cursor-pointer position-relative">
                <Icon
                    color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                    name="globe" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}
                    onClick={() => setIsLocaleOpen(true)}></Icon>
                <h3 onClick={() => setIsLocaleOpen(true)} title={current_lang.title}>{current_lang.name}</h3>
                {isLocaleOpen && <DropdownWrapper classPrefix={classPrefix} onClose={() => setIsLocaleOpen(false)}><LocaleDropdown classPrefix={classPrefix}/></DropdownWrapper>}
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
                        onClick={() => setIsSettingsOpen(true)}
                        name="arrowDown" size={width > 1500 ? 25 : (width > 700 ? 18 : 12)}/>
                </div>
                {isSettingsOpen && <DropdownWrapper classPrefix={classPrefix} onClose={() => setIsSettingsOpen(false)}><SettingsDropdown onHandleClick={changeTheme} classPrefix={classPrefix}/></DropdownWrapper>}
            </div>
            <div className="flex items-center cursor-pointer position-relative">
                <Icon
                    color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                    name="person" size={width > 1500 ? 40 : (width > 700 ? 32 : 24)}></Icon>
                <Icon
                    color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                    name="arrowDown" size={width > 1500 ? 25 : (width > 700 ? 18 : 12)}
                    onClick={() => setIsProfileSettingsOpen(true)}
                    className={classPrefix === 'footer' ? 'transform-rotate-180' : ''}
                ></Icon>
                {isProfileSettingsOpen && <DropdownWrapper classPrefix={classPrefix} onClose={() => setIsProfileSettingsOpen(false)}><ProfileLinksDropdown classPrefix={classPrefix} /></DropdownWrapper>}
            </div>
        </div>
    );
};

export default LocaleSettingsProfile;

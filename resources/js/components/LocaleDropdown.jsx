import React from 'react';
import Icon from "@/components/Icon.jsx";
import {useWindowSize} from "react-use";
import {useSelector} from "react-redux";

const LocaleDropdown = ({classPrefix}) => {
    const {mode} = useSelector((state) => state.themeMode);
    return (
        <div className={`${classPrefix}-dropdown`} style={{zIndex: 100}}>
            <div className="flex items-center cursor-pointer">
                <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="globe" size="25"></Icon>
                <h5>EN</h5>
            </div>
            <div className="flex items-center cursor-pointer">
                <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="globe" size="25"></Icon>
                <h5>RU</h5>
            </div>

        </div>
    );
};

export default LocaleDropdown;

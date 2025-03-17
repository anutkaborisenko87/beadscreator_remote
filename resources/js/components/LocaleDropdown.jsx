import React from 'react';
import Icon from "@/components/Icon.jsx";
import {useWindowSize} from "react-use";

const LocaleDropdown = () => {
    return (
        <div className="header-dropdown">
            <div className="flex items-center cursor-pointer">
                <Icon color='#A7DCEB' name="globe" size="25"></Icon>
                <h5>EN</h5>
            </div>
            <div className="flex items-center cursor-pointer">
                <Icon color='#A7DCEB' name="globe" size="25"></Icon>
                <h5>RU</h5>
            </div>

        </div>
    );
};

export default LocaleDropdown;

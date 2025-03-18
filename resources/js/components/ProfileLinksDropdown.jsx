import Icon from "@/components/Icon.jsx";
import React from "react";
import {useSelector} from "react-redux";

const ProfileLinksDropdown = ({classPrefix}) => {
    const {mode} = useSelector((state) => state.themeMode);
    return (
        <div className={`${classPrefix}-dropdown`}>
            <div className="flex items-center cursor-pointer">
                <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="person_edit" size="25"/>
                <small>Профіль</small>
            </div>
            <div className="flex items-center cursor-pointer">
                <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="person_exit" size="25"></Icon>
                <h5>Вийти</h5>
            </div>

        </div>
    );
};

export default ProfileLinksDropdown;

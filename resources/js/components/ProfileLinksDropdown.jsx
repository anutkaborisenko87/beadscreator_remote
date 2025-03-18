import Icon from "@/components/Icon.jsx";
import React from "react";

const ProfileLinksDropdown = () => {
    return (
        <div className="header-dropdown">
            <div className="flex items-center cursor-pointer">
                <Icon color='#A7DCEB' name="person_edit" size="25"/>
                <small>Профіль</small>
            </div>
            <div className="flex items-center cursor-pointer">
                <Icon color='#A7DCEB' name="person_exit" size="25"></Icon>
                <h5>Вийти</h5>
            </div>

        </div>
    );
};

export default ProfileLinksDropdown;

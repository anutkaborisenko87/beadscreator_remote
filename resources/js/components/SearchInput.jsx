import React from 'react';
import Icon from "@/components/Icon.jsx";

const SearchInput = ({classDivName, classInputName, iconSize, placeholderText, color = '#031945', iconName = "search", type="search", ...props}) => {
    return (
        <div className={classDivName}>
            <input type={type} className={classInputName} placeholder={placeholderText} {...props}/>
            <Icon name={iconName} size={iconSize} color={color} className={'cursor-pointer position-absolute right-[5%] top-[25%]'}/>
        </div>
    );
};

export default SearchInput;

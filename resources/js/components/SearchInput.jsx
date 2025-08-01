import React from 'react';
import Icon from "@/components/Icon.jsx";

const SearchInput = ({classDivName, classInputName, iconSize, placeholderText, color = '#031945', ...props}) => {
    return (
        <div className={classDivName}>
            <input type="search" className={classInputName} placeholder={placeholderText} {...props}/>
            <Icon name="search" size={iconSize} color={color} className={'cursor-pointer position-absolute right-[5%] top-[25%]'}/>
        </div>
    );
};

export default SearchInput;

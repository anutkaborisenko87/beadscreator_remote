import React from 'react';
import Icon from "@/components/Icon.jsx";
import {useWindowSize} from "react-use";
import {useSelector} from "react-redux";
import {Link, usePage} from "@inertiajs/react";

const LocaleDropdown = ({classPrefix, onClose}) => {
    const {langs, url} = usePage().props;
    const dropdownLangs = langs.filter((lang) => lang.current !== true);
    const {mode} = useSelector((state) => state.themeMode);
    return (
        <div className={`${classPrefix}-dropdown`} style={{zIndex: 100}}>
            {dropdownLangs.map((lang) => {
                return (
                    <Link href={`/${lang.slug}/${url.replace(/^\/+/, '')}`}
                          onClick={() => onClose()}
                          className={`flex items-center cursor-pointer no-underline text-[${classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}]`}
                          key={lang.id}>
                        <Icon
                            color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')}
                            name="globe" size="25"></Icon>
                        <h5 title={lang.title}>{lang.name}</h5>
                    </Link>
                )
            })}

        </div>
    );
};

export default LocaleDropdown;

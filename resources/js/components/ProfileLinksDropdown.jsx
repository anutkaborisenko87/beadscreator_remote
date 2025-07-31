import Icon from "@/components/Icon.jsx";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {openCloseModal} from "../store/modalSlice.js";
import {Link, usePage} from "@inertiajs/react";

const ProfileLinksDropdown = ({classPrefix}) => {
    const {auth_login_dropdown, auth_register_dropdown, auth_logout_dropdown, auth_profile_dropdown} = usePage().props;
    const dispatch = useDispatch();
    const {mode} = useSelector((state) => state.themeMode);
    const {user} = useSelector((state) => state.authUser);
    return (
        <div className={`${classPrefix}-dropdown`} style={{zIndex: 100}}>
            {
                user ?
                    <>
                        <Link href={'/my-profile'} className="flex items-center cursor-pointer no-underline">
                            <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="person_edit" size="25"/>
                            <small className={`${classPrefix === 'header' ? 'text-[#A7DCEB]' : (mode === 'positive' || mode === '' ? 'text-[#0E0448]' : 'text-[#B9B1EE]')}`}>{auth_profile_dropdown.title ?? ''}</small>
                        </Link>
                        <Link href={'/logout'} className="flex items-center cursor-pointer no-underline">
                            <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="person_exit" size="25"></Icon>
                            <h5 className={`${classPrefix === 'header' ? 'text-[#A7DCEB]' : (mode === 'positive' || mode === '' ? 'text-[#0E0448]' : 'text-[#B9B1EE]')}`}>{auth_logout_dropdown.title ?? ''}</h5>
                        </Link>
                    </>
                    :
                    <>
                        <div className="flex items-center cursor-pointer" onClick={() => {
                            dispatch(openCloseModal({open: true, mode: 'login'}));

                        }}>
                            <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="person_login" size="25"></Icon>
                            <h5>{auth_login_dropdown.title ?? ''}</h5>
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => {
                            dispatch(openCloseModal({open: true, mode: 'register'}));

                        }}>
                            <Icon color={classPrefix === 'header' ? '#A7DCEB' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} name="person_register" size="25"></Icon>
                            <h5>{auth_register_dropdown.title}</h5>
                        </div>
                    </>
            }
        </div>
    );
};

export default ProfileLinksDropdown;

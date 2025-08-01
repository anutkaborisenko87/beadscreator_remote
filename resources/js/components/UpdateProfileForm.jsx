import {openCloseModal} from "@/store/modalSlice.js";
import {router, usePage} from "@inertiajs/react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Icon from "@/components/Icon.jsx";
import {axiosProfileData} from "@/store/profileDataSlice.js";

const UpdateProfileForm = () => {
    const props = usePage().props;
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.profileData?.profileData);
    const [formInputs, setFormInputs] = useState({
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        login: null,
        oldPassword: null,
        password: null,
        confirmPassword: null
    });
    const [emailLabelVisible, setEmailLabelVisible] = useState(profileData !== null && profileData.email !== null && profileData.email !== '');
    const [loginLabelVisible, setLoginLabelVisible] = useState(profileData !== null && profileData.login !== null && profileData.login !== '');
    const [firstNameLabelVisible, setFirstNameLabelVisible] = useState(profileData !== null && profileData.firstName !== null && profileData.firstName !== '');
    const [lastNameLabelVisible, setLastNameLabelVisible] = useState(profileData !== null && profileData.lastName !== null && profileData.lastName !== '');
    const [oldPasswordLabelVisible, setOldPasswordLabelVisible] = useState(false);
    const [passwordLabelVisible, setPasswordLabelVisible] = useState(false);
    const [confirmPasswordLabelVisible, setConfirmPasswordLabelVisible] = useState(false);
    const [oldPasswordInputType, setOldPasswordInputType] = useState('password');
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [confirmPasswordInputType, setConfirmPasswordInputType] = useState('password');
    const [errors, setErrors] = useState({});
    const handleUpdateProfileData = (e) => {
        e.preventDefault();
        const filteredInputs = Object.keys(formInputs).reduce((acc, key) => {
            if (formInputs[key] !== null) {
                acc[key] = formInputs[key];
            }
            return acc;
        }, {});

        router.put('/my-profile/update', {
                _token: props.csrf_token,
                ...filteredInputs
            }, {
                preserveState: true,
                onError: (errors) => {
                    setErrors(errors);
                },
                onSuccess: (response) => {
                    dispatch(openCloseModal({open: false}));
                }
            }
        )
    }
    useEffect(() => {
        async function fetchProfileData() {
            await dispatch(axiosProfileData());
        }

        fetchProfileData();
        setFormInputs({
            id: profileData?.id ?? null,
            firstName: profileData?.firstName ?? null,
            lastName: profileData?.lastName ?? null,
            email: profileData?.email ?? null,
            login: profileData?.login ?? null,
            oldPassword: null,
            password: null,
            confirmPassword: null,
        });

    }, [dispatch]);
    useEffect(() => {
        if (profileData) {
            setFormInputs({
                id: profileData.id ?? null,
                firstName: profileData.firstName ?? '',
                lastName: profileData.lastName ?? '',
                email: profileData.email ?? '',
                login: profileData.login ?? '',
                oldPassword: null,
                password: null,
                confirmPassword: null,
            });
        }
    }, [profileData]);

    return (
        <>
            <div className={'flex bg-[#1F51BD] h-[100px] justify-center items-center'}>
                <h2 className={'text-[#ffffff]'}>{props.update_profile_popup_title.title ?? ''}</h2>
            </div>
            <div className={'bg-[#AEC2ED] p-[1em] flex flex-col gap-[0.5em]'}>
                <form className={'p-[1em] flex flex-col gap-[0.5em]'} onSubmit={handleUpdateProfileData}>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {firstNameLabelVisible && <label htmlFor="firstName"
                                                         className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.update_profile_first_name_label.title ?? ''}
                        </label>}
                        <input type="firstName"
                               id={'firstName'}
                               onFocus={() => setFirstNameLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.firstName === null || formInputs.firstName === '') setFirstNameLabelVisible(false);
                               }}
                               onChange={(e) => setFormInputs((prevState) => ({
                                   ...prevState,
                                   firstName: e.target.value
                               }))}
                               placeholder={props.update_profile_first_name_label.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                               value={formInputs.firstName}
                        />
                        {errors?.firstName && <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.firstName}</p>}
                    </div>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {lastNameLabelVisible && <label htmlFor="firstName"
                                                        className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.update_profile_last_name_label.title ?? ''}
                        </label>}
                        <input type="firstName"
                               id={'firstName'}
                               onFocus={() => setLastNameLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.lastName === null || formInputs.lastName === '') setLastNameLabelVisible(false);
                               }}
                               onChange={(e) => setFormInputs((prevState) => ({
                                   ...prevState,
                                   lastName: e.target.value
                               }))}
                               placeholder={props.update_profile_last_name_label.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                               value={formInputs.lastName}
                        />
                        {errors?.lastName && <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.lastName}</p>}
                    </div>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {loginLabelVisible && <label htmlFor="login"
                                                     className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.update_profile_login_label.title ?? ''}
                        </label>}
                        <input type="login"
                               id={'login'}
                               onFocus={() => setLoginLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.login === null || formInputs.login === '') setLoginLabelVisible(false);
                               }}
                               onChange={(e) => setFormInputs((prevState) => ({...prevState, login: e.target.value}))}
                               placeholder={props.update_profile_login_label.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                               value={formInputs.login}
                        />
                        {errors?.login && <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.login}</p>}
                    </div>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {emailLabelVisible && <label htmlFor="email"
                                                     className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.update_profile_email_label.title ?? ''}
                        </label>}
                        <input type="email"
                               id={'email'}
                               onFocus={() => setEmailLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.email === null || formInputs.email === '') setEmailLabelVisible(false);
                               }}
                               onChange={(e) => setFormInputs((prevState) => ({...prevState, email: e.target.value}))}
                               placeholder={props.update_profile_email_label.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                               value={formInputs.email}
                        />
                        {errors?.email && <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.email}</p>}
                    </div>
                    <div className="flex justify-between items-baseline w-[95%] mx-auto my-0 gap-[0.5em]">
                        <hr className="flex-1 border-t border-[#0E0448]"/>
                        <span className="px-4 text-gray-700">{props.update_profile_password_title.title ?? ''}</span>
                        <hr className="flex-1 border-t border-[#0E0448]"/>
                    </div>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {oldPasswordLabelVisible && <label htmlFor="password"
                                                        className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.update_profile_old_password_label.title ?? ''}
                        </label>}
                        <input type={oldPasswordInputType}
                               id={'password'}
                               onFocus={() => setOldPasswordLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.oldPassword === null || formInputs.oldPassword === '') setOldPasswordLabelVisible(false);
                               }}
                               onChange={(e) => setFormInputs((prevState) => ({
                                   ...prevState,
                                   oldPassword: e.target.value
                               }))}
                               placeholder={props.update_profile_old_password_label.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                        />
                        {errors?.oldPassword && <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.oldPassword}</p>}
                        {oldPasswordInputType === 'password' &&
                            <Icon name="see_password" size={20} color={'#0E0448'}
                                  className={'absolute top-[35%] right-[3%] cursor-pointer'}
                                  onClick={() => setOldPasswordInputType('text')}
                            />
                        }
                        {oldPasswordInputType === 'text' &&
                            <Icon name="hide_password" size={20} color={'#0E0448'}
                                  className={'absolute top-[35%] right-[3%] cursor-pointer'}
                                  onClick={() => setOldPasswordInputType('password')}
                            />
                        }
                    </div>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {passwordLabelVisible && <label htmlFor="password"
                                                        className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.update_profile_new_password_label.title ?? ''}
                        </label>}
                        <input type={passwordInputType}
                               id={'password'}
                               onFocus={() => setPasswordLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.password === null || formInputs.password === '') setPasswordLabelVisible(false);
                               }}
                               onChange={(e) => setFormInputs((prevState) => ({
                                   ...prevState,
                                   password: e.target.value
                               }))}
                               placeholder={props.update_profile_new_password_label.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                        />
                        {errors?.password && <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.password}</p>}
                        {passwordInputType === 'password' &&
                            <Icon name="see_password" size={20} color={'#0E0448'}
                                  className={'absolute top-[35%] right-[3%] cursor-pointer'}
                                  onClick={() => setPasswordInputType('text')}
                            />
                        }
                        {passwordInputType === 'text' &&
                            <Icon name="hide_password" size={20} color={'#0E0448'}
                                  className={'absolute top-[35%] right-[3%] cursor-pointer'}
                                  onClick={() => setPasswordInputType('password')}
                            />
                        }
                    </div>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {confirmPasswordLabelVisible && <label htmlFor="confirmPassword"
                                                               className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.register_popup_repeat_password_placeholder.title ?? ''}
                        </label>}
                        <input type={confirmPasswordInputType}
                               id={'confirmPassword'}
                               onFocus={() => setConfirmPasswordLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.confirmPassword === null || formInputs.confirmPassword === '') setConfirmPasswordLabelVisible(false);
                               }}
                               onChange={(e) => setFormInputs((prevState) => ({
                                   ...prevState,
                                   confirmPassword: e.target.value
                               }))}
                               placeholder={props.register_popup_repeat_password_placeholder.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                        />
                        {errors?.confirmPassword &&
                            <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.confirmPassword}</p>}
                        {confirmPasswordInputType === 'password' &&
                            <Icon name="see_password" size={20} color={'#0E0448'}
                                  className={'absolute top-[35%] right-[3%] cursor-pointer'}
                                  onClick={() => setConfirmPasswordInputType('text')}
                            />
                        }
                        {confirmPasswordInputType === 'text' &&
                            <Icon name="hide_password" size={20} color={'#0E0448'}
                                  className={'absolute top-[35%] right-[3%] cursor-pointer'}
                                  onClick={() => setConfirmPasswordInputType('password')}
                            />
                        }
                    </div>

                    <button type={'submit'}
                            className={'bg-[#031945] text-[#ffffff] text-[1em] text-bold px-[1em] py-[1em] rounded-[10px] w-[90%] mx-auto my-[1em] cursor-pointer'}>
                        {props.update_profile_popup_title.title ?? ''}
                    </button>
                </form>

            </div>

        </>
    );
};

export default UpdateProfileForm;

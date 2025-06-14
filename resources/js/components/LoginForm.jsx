import {useState} from "react";
import Icon from "./Icon.jsx";
import {useDispatch} from "react-redux";
import {openCloseModal} from "../store/modalSlice.js";
import {router, usePage} from "@inertiajs/react";


const LoginForm = () => {
    const props = usePage().props;
    const dispatch = useDispatch();
    const [formInputs, setFormInputs] = useState({email: null, password: null, remember: false});
    const [emailLabelVisible, setEmailLabelVisible] = useState(false);
    const [passwordLabelVisible, setPasswordLabelVisible] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [errors, setErrors] = useState({});
    const handleLogin = (e) => {
        e.preventDefault();
        router.post('/login', {
                _token: props.csrf_token,
                ...formInputs
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

    return (
        <>
            <div className={'flex bg-[#1F51BD] h-[100px] justify-center items-center'}>
                <h2 className={'text-[#ffffff]'}>{props.login_popup_title.title ?? ''}</h2>
            </div>
            <div className={'bg-[#AEC2ED] p-[1em] flex flex-col gap-[0.5em]'}>
                <form className={'p-[1em] flex flex-col gap-[0.5em]'} onSubmit={handleLogin}>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {emailLabelVisible && <label htmlFor="email"
                                                     className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.login_popup_email_placeholder.title ?? ''}
                        </label>}
                        <input type="email"
                               id={'email'}
                               onFocus={() => setEmailLabelVisible(true)}
                               onBlur={() => {
                                   if (formInputs.email === null || formInputs.email === '') setEmailLabelVisible(false);
                               }}
                               onChange={(e) => {
                                   setErrors((prevState) => ({...prevState, email: null}));
                                   setFormInputs((prevState) => ({...prevState, email: e.target.value}));
                               }}
                               placeholder={props.login_popup_email_placeholder.title ?? ''}
                               className={'border-0 px-[1.5em] py-[1em] placeholder-[#0E0448] w-[95%] focus:outline-[#47484b] focus:ring-0 focus:border-transparent bg-[#D9D9D9] rounded-[10px]'}
                        />
                        {errors?.email && <p className={'text-xs text-[#e51212] px-[1.5em]'}>{errors.email}</p>}
                    </div>
                    <div className='flex flex-col p-[1em] justify-center items-start relative'>
                        {passwordLabelVisible && <label htmlFor="password"
                                                        className={'absolute top-[15%] left-[3%] text-[0.75em] text-[#47484b] bg-[#D9D9D9]'}>
                            {props.login_popup_password_placeholder.title ?? ''}
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
                               placeholder={props.login_popup_password_placeholder.title ?? ''}
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
                    <div className="flex justify-between items-baseline w-[95%] mx-auto my-0">
                        <label className="inline-flex gap-[0.5em] items-center cursor-pointer text-[#0E0448]">
                            <input
                                type="checkbox"
                                checked={formInputs.remember}
                                onChange={(e) =>
                                    setFormInputs((prevState) => ({
                                        ...prevState,
                                        remember: e.target.checked,
                                    }))
                                }
                                className="form-checkbox h-[15px] w-[15px] bg-[#A7DCEB] border-[#03627C] rounded focus:ring-[#03627C]"
                            />
                            <span className="ml-2 text-gray-700">{props.login_popup_remember_label.title ?? ''}</span>
                        </label>
                        <button
                            className={'bg-transparent border-0 text-[#0E0448] cursor-pointer underline underline-offset-4'}
                            onClick={() => dispatch(openCloseModal({open: true, mode: 'register'}))}
                        >
                            {props.login_popup_sign_up_label.title ?? ''}
                        </button>
                    </div>
                    <button type="submit"
                            className={'bg-[#031945] text-[#ffffff] text-[1em] text-bold px-[1em] py-[1em] rounded-[10px] w-[90%] mx-auto my-[1em] cursor-pointer'}>
                        {props.login_popup_sign_in_button.title ?? ''}
                    </button>
                </form>
                <div className="flex justify-between items-baseline w-[95%] mx-auto my-0">
                    <button
                        className={'bg-transparent border-0 text-[#0E0448] cursor-pointer underline underline-offset-4'}
                    >
                        {props.login_popup_forgot_password_link.title ?? ''}
                    </button>
                </div>
                <div className="flex justify-between items-baseline w-[95%] mx-auto my-0 gap-[0.5em]">
                    <hr className="flex-1 border-t border-[#0E0448]"/>
                    <span className="px-4 text-gray-700">{props.login_popup_google_auth.title ?? ''}</span>
                    <hr className="flex-1 border-t border-[#0E0448]"/>
                </div>
                <a href="/auth/google/redirect"
                   className={'bg-[#031945] text-center text-[#ffffff] text-[1em] text-bold px-[1em] py-[1em] rounded-[10px] w-[90%] mx-auto my-[1em] cursor-pointer'}>
                    <Icon name="google" size={20} color={'#ffffff'}/>
                </a>
            </div>

        </>
    );
};

export default LoginForm;

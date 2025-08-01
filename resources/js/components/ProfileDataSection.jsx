import {useWindowSize} from "react-use";
import {useDispatch, useSelector} from "react-redux";
import Icon from "@/components/Icon.jsx";
import {openCloseModal} from "@/store/modalSlice.js";

const ProfileDataSection = ({data}) => {
    const {mode} = useSelector((state) => state.themeMode);
    const {width} = useWindowSize();
    const dispatch = useDispatch();
    let color = '';
    switch (mode) {
        case 'positive':
            color = '#031945';
            break;
        case 'negative':
            color = '#D9D9D9';
            break;
        case 'dark':
            color = '#AEC2ED';
            break;
        default:
            color = '#031945';
    }
    return (
        <div className={'w-5/6 mx-auto flex gap-[2em] py-[1em]'}>
            <div className={`profile-main-section w-[100%] flex justify-between items-start gap-[2em]`}>
                <Icon name={'profile_logo'} color={color} size={80} className={'mr-2'}/>
                <div className={`flex flex-col justify-start items-start gap-[1em]`}>
                    <h4 className={`text-start ${width > 700 ? 'text-[2em]' : 'text-[1.5em]'}`}>
                        {data.name_title} {data.user_name}
                    </h4>
                    <p className={`text-start ${width > 700 ? 'text-[1.5em]' : 'text-[1em]'}`}>
                        {data.email_title} {data.user_email}
                    </p>
                </div>
                <div className={`flex flex-col justify-start items-start gap-[1em]`}>
                    <h4 className={`text-start ${width > 700 ? 'text-[2em]' : 'text-[1.5em]'}`}>
                        {data.login_title} {data.user_login}
                    </h4>
                </div>
                <Icon name={'edit'} color={color} size={40} className={'mr-2 cursor-pointer'} onClick={
                    () => {dispatch(openCloseModal({ open: true, mode: 'update_profile' }))}
                }/>
            </div>
        </div>
    );
};

export default ProfileDataSection;

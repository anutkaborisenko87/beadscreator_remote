import {useSelector} from "react-redux";
import Icon from "@/components/Icon.jsx";

const ProfileBreadcrumbs = ({data}) => {
    const {mode} = useSelector((state) => state.themeMode);
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
        <div className={'w-5/6 mx-auto py-[2em] flex items-center'}>
            {data.icon && <Icon name={data.icon} color={color} size={25} className={'mr-2'}/>}
            {data.title && <h3 className={`text-[${color}] py-0 px-[1em] underline underline-offset-4`}>{data.title}</h3>}
       </div>
    );
};

export default ProfileBreadcrumbs;

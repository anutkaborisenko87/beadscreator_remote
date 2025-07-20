import {useSelector} from "react-redux";
import Icon from "@/components/Icon.jsx";

const AuthorTitleSection = ({data}) => {
    console.log('AuthorTileSection item: ', data)
    const {mode} = useSelector((state) => state.themeMode);
    let color = '';
    let background = '';
    switch (mode) {
        case 'positive':
            color = '#031945';
            background = `#AEC2ED`;
            break;
        case 'negative':
            color = '#D9D9D9';
            background = `#3663C4`;
            break;
        case 'dark':
            color = '#AEC2ED';
            background = `#1F51BD`;
            break;
        default:
            color = '#031945';
            background = `#D9D9D9`;
            break
    }
    return (
        <div className={'w-5/6 mx-auto flex justify-center gap-[2em] py-[2em]'}>
            <div className={`flex justify-between items-center gap-[1em] bg-[${background}] rounded-[15px] p-[1em]`}>
                <Icon name='profile_logo' color={color} size={40}/>
                <h2>{data.title}</h2>
                <h3>{data.author_name}</h3>

            </div>
        </div>
    );
};

export default AuthorTitleSection;

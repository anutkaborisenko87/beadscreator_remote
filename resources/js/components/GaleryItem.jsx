import Icon from "@/components/Icon.jsx";
import {useSelector} from "react-redux";
import {Link} from "@inertiajs/react";

const GaleryItem = ({item}) => {
    const {mode} = useSelector((state) => state.themeMode);
    let color = '';
    let background = '';
    switch (mode) {
        case 'positive':
            color = '#031945';
            background = 'rgba(174, 194, 237, 0.6)';
            break;
        case 'negative':
            color = '#D9D9D9';
            background = 'rgba(54, 99, 196, 0.6)';
            break;
        case 'dark':
            color = '#AEC2ED';
            background = 'rgba(31, 81, 189, 0.6)';
            break;
        default:
            color = '#031945';
            background = 'rgba(174, 194, 237, 0.6)';
    }
    return (
        <div className={'galery-item-block'}>
            <div className={`flex flex-col justify-start items-stretch w-1/3 px-[2em] gap-[2em]`}>
                <h3 className={`text-[2em]`} style={{color: color}}>{item.title}</h3>
                <p style={{color: color}}>{item.description}</p>
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-center gap-[0.5em]'}>
                        <Icon name={'person_location'} size={24} color={color}/>
                        <Link className={`text-[1.3em]`} href={item.author.link}
                              style={{color: color}}>{item.author.name}</Link>
                    </div>
                    <div className={'flex items-center gap-[0.5em]'}>
                        <Icon name={'comments'} size={24} color={color}/>
                        <Link className={`text-[1.3em]`} href={item.comments.link}
                              style={{color: color}}>{item.comments.count}</Link>
                    </div>
                    <div className={'flex items-center gap-[0.5em]'}>
                        {item.likes.liked ? <Icon className={'cursor-pointer'} name={'liked'} size={24} color={color}/> :
                            <Icon className={'cursor-pointer'} name={'likes'} size={24} color={color}/>}
                        <p className={`text-[1.3em] no-underline`} style={{color: color}}>{item.likes.count}</p>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col justify-start items-center w-1/5`}>
                <img src={item.photo} alt={item.title} className={'w-1/2'}/>
            </div>
            <div className={`flex flex-col justify-center items-center gap-[5em]  px-[2em]`}>
                <button className={`galery-download-button font-bold`}>
                    <Icon name={'download'} size={24} color={color}/>
                    PNG
                </button>
                <button className={`galery-download-button font-bold`}>
                    <Icon name={'download'} size={24} color={color}/>
                    JPG
                </button>
            </div>
            <div className={'flex flex-col justify-center items-center w-1/4 px-[2em]'}>
                <img src={item.photo} alt={item.title} className={'w-full'}/>
            </div>

        </div>
    );
};

export default GaleryItem;

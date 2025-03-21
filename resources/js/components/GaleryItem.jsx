import Icon from "@/components/Icon.jsx";
import {useSelector} from "react-redux";
import {Link} from "@inertiajs/react";
import {useWindowSize} from "react-use";

const GaleryItem = ({item}) => {
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
    const {width} = useWindowSize();
    return (
        <div className={`${width > 900 ? 'galery-item-block' : 'galery-item-block-mobile'} galery-item-block-background`}>
            <div className={width > 900 ? `flex flex-col justify-start items-stretch w-1/3 px-[2em] gap-[2em]` : 'flex justify-between items-center px-[1.5em]  gap-[1em]'}>
                <h3 className={`text-[2em]`} style={{color: color}}>{item.title}</h3>
                <p style={{color: color}}>{item.description}</p>
                <div className={width > 900 ? 'flex items-center justify-between' : 'flex flex-col justify-between items-stretch gap-[1em]'}>
                    <div className={'flex items-center gap-[0.5em]'}>
                        <Icon name={'person_location'} size={24} color={color}/>
                        <Link className={width > 900 ? `text-[1.3em]` : 'text-[0.8em]'} href={item.author.link}
                              style={{color: color}}>{item.author.name}</Link>
                    </div>
                    <div className={'flex items-center gap-[0.5em]'}>
                        <Icon name={'comments'} size={24} color={color}/>
                        <Link className={width > 900 ? `text-[1.3em]` : 'text-[0.8em]'} href={item.comments.link}
                              style={{color: color}}>{item.comments.count}</Link>
                    </div>
                    <div className={'flex items-center gap-[0.5em]'}>
                        {item.likes.liked ? <Icon className={'cursor-pointer'} name={'liked'} size={24} color={color}/> :
                            <Icon className={'cursor-pointer'} name={'likes'} size={24} color={color}/>}
                        <p className={width > 900 ? `text-[1.3em]` : 'text-[0.8em]'} style={{color: color}}>{item.likes.count}</p>
                    </div>
                </div>
            </div>
            <div className={width > 900 ? `flex flex-col justify-start items-center w-1/5` : 'flex justify-center items-center  gap-[1em]'}>
                <img src={item.photo} alt={item.title} className={'w-1/2'}/>
            </div>
            <div className={width > 900 ? `flex flex-col justify-center items-center gap-[5em]  px-[2em]` : `flex justify-between items-center gap-[1em]  px-[1em]`}>
                <button className={`galery-download-button font-bold`}>
                    <Icon name={'download'} size={24} color={color}/>
                    PNG
                </button>
                <button className={`galery-download-button font-bold`}>
                    <Icon name={'download'} size={24} color={color}/>
                    JPG
                </button>
            </div>
            <div className={`flex flex-col justify-center items-center ${width > 900 ? 'w-1/4 px-[2em]' : 'w-5/6 px-[1em]'}`}>
                <img src={item.photo} alt={item.title} className={'w-full'}/>
            </div>
        </div>
    );
};

export default GaleryItem;

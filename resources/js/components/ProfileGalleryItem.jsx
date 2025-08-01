import {useSelector} from "react-redux";
import Icon from "@/components/Icon.jsx";
import {Link} from "@inertiajs/react";

const ProfileGalleryItem = ({data, section_slug, per_page}) => {
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
    const renderFooter = () => {
        switch (section_slug) {
            case 'gallery_patterns':
                return (
                    <div
                        className={`flex justify-start items-start gap-[2em]`}>
                        <h5 className={`text-[1.5em]`} style={{color: color}}>{data.title}</h5>

                        <div className={'flex items-center gap-[0.5em]'}>
                            <Icon name={'comments'} size={24} color={color}/>
                            <Link className={`text-[1.3em]`} href={data.comments.link}
                                  style={{color: color}}>{data.comments.count}</Link>
                        </div>
                        <div className={'flex items-center gap-[0.5em]'}>
                            <Icon className={'cursor-pointer'} name={'likes'} size={24} color={color}/>
                            <p className={`text-[1.3em]`}
                               style={{color: color}}>{data.likes.count}</p>
                        </div>
                    </div>
                );
            case 'drafts':
                return (
                    <div
                        className={`flex flex-col justify-start items-start gap-[2em]`}>
                        <p className={`text-[1em]`} style={{color: color}}>{data.created_at}</p>
                    </div>
                );
            default:
                return (
                    <div
                        className={`flex flex-col justify-start items-start gap-[2em]`}>
                        <h4 className={`text-[2em]`} style={{color: color}}>{data.title}</h4>
                        <div
                            className={'flex items-center justify-between'}>
                            <div className={'flex items-center gap-[0.5em]'}>
                                <Icon name={'person_location'} size={24} color={color}/>
                                {data.author.url !== null ?
                                    <Link className={`text-[1.3em]`} href={data.author.url}
                                          style={{color: color}}>{data.author.name}</Link> :
                                    <h4 className={`text-[1.3em]`}
                                        style={{color: color}}>{data.author.name}</h4>
                                }
                            </div>
                            <div className={'flex items-center gap-[0.5em]'}>
                                <Icon name={'comments'} size={24} color={color}/>
                                <Link className={`text-[1.3em]`} href={data.comments.link}
                                      style={{color: color}}>{data.comments.count}</Link>
                            </div>
                            <div className={'flex items-center gap-[0.5em]'}>
                                {data.likes.liked ?
                                    <Icon className={'cursor-pointer'} name={'liked'} size={24} color={color}/> :
                                    <Icon className={'cursor-pointer'} name={'likes'} size={24} color={color}/>}
                                <p className={`text-[1.3em]`}
                                   style={{color: color}}>{data.likes.count}</p>
                            </div>
                        </div>
                    </div>
                );
        }
    }
    return (
        <div
            className={`galery-item-block-background  rounded-[15px] p-[1em] w-1/${per_page}`}>
            {data.link === null ?
                <div
                    className={`flex justify-center items-start w-[90%] my-[1em]`}>
                    <img src={data.preview} alt={data.title} className={'w-[90%] h-[10em]'}/>
                </div> :
                <Link href={data.link}
                    className={`flex justify-center items-start w-[90%] my-[1em]`}>
                    <img src={data.preview} alt={data.title} className={'w-[90%] h-[10em]'}/>
                </Link>
            }
            {renderFooter()}

        </div>
    );
};

export default ProfileGalleryItem;

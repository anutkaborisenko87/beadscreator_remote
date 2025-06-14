import {useWindowSize} from "react-use";
const HomePageSection = ({data}) => {
    const {width} = useWindowSize();
    return (
        <div className={'w-5/6 mx-auto flex flex-col gap-[2em] py-[2em]'}>
            <div className={`grid ${width > 700 ? 'grid-cols-2 gap-[2em]' : 'grid-cols-1 gap-[0.5em]'}`}>
                <div className={`flex flex-col ${width > 700 ? 'gap-[2em]' : 'gap-[0.5em]'}`}>
                    <div className={`text-start homepage-main-sections ${width > 700 ?  'text-[1.5em]' : 'text-[1em]' }`}>
                        <p>
                            {data.presentation_section ?? ''}
                        </p>
                    </div>
                    <div className={`text-center homepage-main-sections ${width > 700 ?  'text-[1.5em]' : 'text-[1em]' }`}>
                        <h3>
                            {data.action_motivate_section ?? ''}
                        </h3>
                    </div>
                </div>

                <div className={`homepage-main-sections`}>
                    <h4 className={`text-center ${width > 700 ?  'text-[2em]' : 'text-[1.5em]' }`}>
                        {data.about_us_section.title ?? ''}
                    </h4>
                    <p className={`text-start ${width > 700 ?  'text-[1.5em]' : 'text-[1em]' }`}>
                        {data.about_us_section.intro ?? ''}
                    </p>
                </div>
            </div>{/*style={{cursor: `url('/images/icons/pencil-line.svg') 16 16, auto`}}*/}
            <div className={`homepage-main-sections`} >
                <h4 className={`text-center ${width > 700 ?  'text-[2em]' : 'text-[1.5em]' }`}>{data.promo_section.title ?? ''}</h4>
                <div className={`grid ${width > 700 ? 'grid-cols-2 justify-between text-[1.5em]' : 'grid-cols-1 text-[1em]'}`}
                     dangerouslySetInnerHTML={{ __html: data.promo_section.intro ?? '' }}
                >
                </div>

            </div>


        </div>
    );
};
export default HomePageSection;

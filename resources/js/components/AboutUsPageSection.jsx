const AboutUsPageSection = ({data}) => {
    return (
        <div className={'about-main-block '}>
            <h2>{ data.title ?? '' }</h2>
           <section dangerouslySetInnerHTML={{ __html: data.main_text ?? '' }}></section>
            <div className={'flex justify-center w-[93%] flex-wrap mx-auto gap-[2em] mb-[2em]'}>
                <img src="/images/img.png" alt="Pre-view"/>
                <img src="/images/img.png" alt="Pre-view"/>
                <img src="/images/img.png" alt="Pre-view"/>
                <img src="/images/img.png" alt="Pre-view"/>
            </div>

        </div>
    );
};

export default AboutUsPageSection;

import React from 'react';
import {Head, usePage} from "@inertiajs/react";
import HomePageSection from "@/components/HomePageSection.jsx";
import GalleryPageSection from "@/components/GalleryPageSection.jsx";
import AboutUsPageSection from "@/components/AboutUsPageSection.jsx";
import EditorPageSection from "@/components/EditorPageSection.jsx";

const Page = () => {
    const props = usePage().props;
    return (
        <div>
            <Head title={props.data.title}></Head>
            {props.data.sections.map((item) => {
                console.log('item', item);
                return (
                    <>
                        {item.slug === 'home_page_section' && <HomePageSection data={item}/>}
                        {item.slug === 'gallery_page_section' && <GalleryPageSection data={item}/>}
                        {item.slug === 'aboutus_page_section' && <AboutUsPageSection data={item}/>}
                        {item.slug === 'editor_page_section' && <EditorPageSection data={item}/>}
                    </>

            )
            })}
        </div>
    );
};

export default Page;

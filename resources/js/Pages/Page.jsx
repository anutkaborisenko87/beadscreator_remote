import React from 'react';
import {Head, usePage} from "@inertiajs/react";
import HomePageSection from "@/components/HomePageSection.jsx";
import GalleryPageSection from "@/components/GalleryPageSection.jsx";
import AboutUsPageSection from "@/components/AboutUsPageSection.jsx";
import EditorPageSection from "@/components/EditorPageSection.jsx";
import AuthorTitleSection from "@/components/AuthorTitleSection.jsx";
import ProfileBreadcrumbs from "@/components/ProfileBreadcrumbs.jsx";
import ProfileDataSection from "@/components/ProfileDataSection.jsx";
import ProfileGallerySectioms from "@/components/ProfileGallerySectioms.jsx";

const Page = () => {
    const props = usePage().props;
    return (
        <div>
            <Head title={props.data.title}></Head>
            {props.data.sections.map((item) => {
                console.log('Page item: ', item);
                return (
                    <section key={item.slug}>
                        {item.slug === 'gallery_patterns' && <ProfileGallerySectioms data={item}/>}
                        {item.slug === 'drafts' && <ProfileGallerySectioms data={item}/>}
                        {item.slug === 'liked' && <ProfileGallerySectioms data={item}/>}
                        {item.slug === 'profile_title_section' && <ProfileBreadcrumbs data={item}/>}
                        {item.slug === 'profile_user_section' && <ProfileDataSection data={item}/>}
                        {item.slug === 'home_page_section' && <HomePageSection data={item}/>}
                        {item.slug === 'gallery_author_section' && <AuthorTitleSection data={item}/>}
                        {item.slug === 'gallery_page_section' && <GalleryPageSection data={item}/>}
                        {item.slug === 'aboutus_page_section' && <AboutUsPageSection data={item}/>}
                        {item.slug === 'editor_page_section' && <EditorPageSection data={item}/>}
                    </section>

            )
            })}
        </div>
    );
};

export default Page;

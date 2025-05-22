import React from 'react';
import {Head, usePage} from "@inertiajs/react";
import Home from "@/Pages/Home.jsx";
import Galery from "@/Pages/Galery.jsx";
import AboutUs from "@/Pages/AboutUs.jsx";
import Editor from "@/Pages/Editor.jsx";

const Page = () => {
    const props = usePage().props;
    return (
        <div>
            <Head title={props.data.title}></Head>
            {props.links.slug === ""  && <Home/>}
            {props.links.slug === "gallery"  && <Galery/>}
            {props.links.slug === "aboutus"  && <AboutUs/>}
            {props.links.slug === "editor"  && <Editor/>}
        </div>
    );
};

export default Page;

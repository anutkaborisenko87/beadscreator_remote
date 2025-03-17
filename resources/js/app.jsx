import './bootstrap';
import '../css/app.css';
import.meta.glob('../images/**');

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from "@/Layouts/Layout.jsx";
import {Provider} from "react-redux";
import store from "./store/store";

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        page.default.layout = page.default.layout || ((page) => <Layout children={page}/>);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <Provider store={store}>
                <App {...props} />
            </Provider>
        )
    },
})

import {Link} from "@inertiajs/react";
import Icon from "@/components/Icon.jsx";
import {useSelector} from "react-redux";

const Pagination = ({current_page, first_page_url, last_page, prev_page_url, next_page_url, last_page_url, links}) => {
    const {mode} = useSelector((state) => state.themeMode);
    let color = '';
    switch (mode) {
        case 'positive':
            color = '#031945';
            break;
        case 'negative':
            color = '#8FA8DE';
            break;
        case 'dark':
            color = '#AEC2ED';
            break;
        default:
            color = '#1F51BD';
    }
    return (
        <div className={'flex justify-center items-center gap-[0.5em] my-[1em]'}>
            {current_page > 2 &&
                <Link className={'pagination-prev-next-links'} href={first_page_url}><Icon name={'first_page'}
                                                                                           color={color} size={32}/></Link>}
            {current_page !== 1 &&
                <Link className={'pagination-prev-next-links'} href={prev_page_url}><Icon name={'prev_page'}
                                                                                          color={color} size={32}/></Link>}
            {links.map((link, index) => {
                if (!link.label.includes('&laquo;') && !link.label.includes('&raquo;')) {
                    return (
                        <Link key={index} href={link.url}
                              className={`pagination-links ${link.active ? 'active' : ''}`}>{link.label}</Link>
                    );
                }
            })}
            {current_page !== last_page &&
                <Link className={'pagination-prev-next-links'} href={next_page_url}><Icon name={'prev_page'}
                                                                                          className={'rotate-180'}
                                                                                          color={color} size={32}/></Link>}
            {current_page < last_page - 2 &&
                <Link className={'pagination-prev-next-links'} href={last_page_url}><Icon name={'first_page'}
                                                                                          className={'rotate-180'}
                                                                                          color={color} size={32}/></Link>}


        </div>
    );
};

export default Pagination;

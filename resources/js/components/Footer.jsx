import Icon from "@/components/Icon.jsx";
import {Link} from "@inertiajs/react";
import {useSelector} from "react-redux";
import LocaleSettingsProfile from "@/components/LocaleSettingsProfile.jsx";
import {useWindowSize} from "react-use";

const Footer = () => {
    const {width} = useWindowSize();
    const {mode} = useSelector((state) => state.themeMode);
    return (
        <footer className="footer">
            <div className={'w-1/4 text-footer-text-light-positive dark:text-footer-text-dark-negative negative:text-footer-text-dark-negative'}><p>Copyright ©</p></div>
            <div className="flex items-center justify-center mx-auto w-1/2 gap-[0.5em]">
                <Icon name="telegram" size="18" color={mode === '' || mode === 'positive' ? '#0E0448' : '#B9B1EE'} background={mode === '' || mode === 'positive' ? '#B9B1EE' : '#0E0448'} />
                <Icon name="facebook" size="18" color={mode === '' || mode === 'positive' ? '#0E0448' : '#B9B1EE'} background={mode === '' || mode === 'positive' ? '#B9B1EE' : '#0E0448'}/>
                <Icon name="instagram" size="18" color={mode === '' || mode === 'positive' ? '#0E0448' : '#B9B1EE'} background={mode === '' || mode === 'positive' ? '#B9B1EE' : '#0E0448'}/>
            </div>
            {
               width > 1060 ?
                   <div className="flex items-center justify-items-start mx-auto w-1/2">
                       <Link href="/" className={`padding-footer-links text-footer-text-light-positive dark:text-footer-text-dark-negative negative:text-footer-text-dark-negative no-underline active:underline border-r-2 ${mode === '' || mode === 'positive' ? '#0E0448' : '#B9B1EE'}`}>Головна</Link>
                       <Link href="/galery" className={`padding-footer-links text-footer-text-light-positive dark:text-footer-text-dark-negative negative:text-footer-text-dark-negative no-underline active:underline border-r-2 ${mode === '' || mode === 'positive' ? '#0E0448' : '#B9B1EE'}`}>Галерея</Link>
                       <Link href="/about" className={`padding-footer-links text-footer-text-light-positive dark:text-footer-text-dark-negative negative:text-footer-text-dark-negative no-underline active:underline  border-r-2 ${mode === '' || mode === 'positive' ? '#0E0448' : '#B9B1EE'}`}>Про нас</Link>
                       <Link href="/editor" className={`padding-footer-links text-footer-text-light-positive dark:text-footer-text-dark-negative negative:text-footer-text-dark-negative no-underline active:underline`}>Редактор схем</Link>
                   </div>
               : <></>
            }

            <LocaleSettingsProfile classPrefix="footer"/>

        </footer>
    );
};

export default Footer;

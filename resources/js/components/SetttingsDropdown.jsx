import Icon from "@/components/Icon.jsx";
import {useSelector, useStore} from "react-redux";



const SettingsDropdown = ({onHandleClick, classPrefix}) => {
    const {mode} = useSelector((state) => state.themeMode);

    return (
        <div className={`${classPrefix}-dropdown`}>
            { mode !== '' && <Icon name="light" size={19} color={ classPrefix === 'header' ? '#D9D9D9' : (mode === 'positive' ? '#0E0448' : '#B9B1EE')} onClick={() => onHandleClick('')}/>}
            { mode !== 'dark' && <Icon name="night" size={19} color={classPrefix === 'header' ? '#D9D9D9' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} onClick={() => onHandleClick('dark')}/>}
            { mode !== 'negative' && <Icon name="negative" size={19} color={classPrefix === 'header' ? '#D9D9D9' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} onClick={() => onHandleClick('negative')}/>}
            { mode !== 'positive' && <Icon name="positive" size={19} color={classPrefix === 'header' ? '#D9D9D9' : (mode === 'positive' || mode === '' ? '#0E0448' : '#B9B1EE')} onClick={() => onHandleClick('positive')}/>}
        </div>
    );
};

export default SettingsDropdown;


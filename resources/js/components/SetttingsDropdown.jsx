import Icon from "@/components/Icon.jsx";
import {useSelector, useStore} from "react-redux";



const SettingsDropdown = ({onHandleClick}) => {
    const {mode} = useSelector((state) => state.themeMode);

    return (
        <div className="header-dropdown">
            { mode !== '' && <Icon name="light" size={19} color={'#D9D9D9'} onClick={() => onHandleClick('')}/>}
            { mode !== 'dark' && <Icon name="night" size={19} color={'#D9D9D9'} onClick={() => onHandleClick('dark')}/>}
            { mode !== 'negative' && <Icon name="negative" size={19} color={'#D9D9D9'} onClick={() => onHandleClick('negative')}/>}
            { mode !== 'positive' && <Icon name="positive" size={19} color={'#D9D9D9'} onClick={() => onHandleClick('positive')}/>}
        </div>
    );
};

export default SettingsDropdown;

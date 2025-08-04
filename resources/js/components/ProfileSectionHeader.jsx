import SelectComponent from "@/components/SelectComponent.jsx";
import {useWindowSize} from "react-use";
import SearchInput from "@/components/SearchInput.jsx";
import {usePage} from "@inertiajs/react";

const ProfileSectionHeader = ({data}) => {
    const props = usePage().props;
    const {width} = useWindowSize();
    return (
        <div className={`mr-auto flex justify-start items-center`}>
            <h2 className={'profile-main-section'}>{data.section_title}</h2>
            {
                data.empty_data ? <SearchInput
                        placeholderText={props.empty_data_input_placeholder.title}
                        type={'text'}
                        iconName={''}
                        classDivName={`position-relative`}
                        classInputName={`select-galery-component ${width > 900 ? 'text-[1.5em] h-[2em]' : 'text-[1em] h-[1.5em]'}`}
                        disabled={true}
                    /> :
                    <SelectComponent placeholder={data?.sort_select?.sort_select_placeholder}
                                     options={data?.sort_select?.sort_select_items}
                                     className={`select-galery-component w-1/2 ${width > 900 ? 'text-[1.5em] h-[2em]' : 'text-[1em] h-[1.5em]'}`}/>
            }
        </div>
    );
};

export default ProfileSectionHeader;

import SelectComponent from "@/components/SelectComponent";
import SearchInput from "@/components/SearchInput.jsx";
import {useSelector} from "react-redux";
import {useWindowSize} from "react-use";
import Pagination from "@/components/Pagination.jsx";
import GaleryItem from "@/components/GaleryItem.jsx";

const GalleryPageSection = ({data}) => {
    const {mode} = useSelector((state) => state.themeMode);
    const iconColor = mode === '' || mode === 'positive' ? '#031945' : (mode === 'negative' ? '#AEC2ED' : '#8FA8DE')
    const {width} = useWindowSize();
    return (
        <>
            <div
                className={`flex justify-center items-center my-[0.5em] w-5/6 ${width > 900 ? 'gap-[1em]' : 'flex-col-reverse gap-[0.5em]'}  mx-auto`}>
                <div
                    className={`flex justify-center items-center ${width > 900 ? 'w-2/3 gap-[1em]' : 'w-full gap-[0.5em]'}  mx-auto`}>
                    <SelectComponent placeholder={data?.category_select?.category_select_placeholder}
                                     options={data?.category_select?.category_select_items}
                                     className={`select-galery-component w-1/2  ${width > 900 ? 'text-[2em] h-[2em]' : 'text-[1.5em] h-[1.7em]'}`}/>
                    <SelectComponent placeholder={data?.sort_select?.sort_select_placeholder}
                                     options={data?.sort_select?.sort_select_items}
                                     className={`select-galery-component w-1/2 ${width > 900 ? 'text-[2em] h-[2em]' : 'text-[1.5em] h-[1.7em]'}`}/>
                </div>

                <SearchInput
                    color={iconColor}
                    iconSize={width > 900 ? 30 : 20}
                    placeholderText={data?.search_input?.search_input_placeholder}
                    classDivName={`search-block-galery position-relative  ${width > 900 ? 'w-2/3' : 'w-full'}`}
                    classInputName={`search-input-galery ${width > 900 ? 'text-[2em] h-[2em]' : 'text-[1.7em] h-[1.7em]'}`}
                />
            </div>
            {data.gallery_items.data.map((item) => (
                <GaleryItem key={item.id} item={item}/>
            ))}
            {data.gallery_items.links.length > 3 && <Pagination {...data.gallery_items} />}
        </>

    );
};

export default GalleryPageSection;

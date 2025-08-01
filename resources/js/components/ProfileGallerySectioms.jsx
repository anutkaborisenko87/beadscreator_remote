import ProfileSectionHeader from "@/components/ProfileSectionHeader.jsx";
import ProfileGalleryItem from "@/components/ProfileGalleryItem.jsx";

const ProfileGallerySectioms = ({data}) => {
    return (
        <div className={'w-5/6 mx-auto flex flex-col justify-center items-center gap-[2em] py-[2em]'}>
            <ProfileSectionHeader data={{ section_title: data.section_title, sort_select: data.sort_select }}/>
            <div className={'flex gap-[1em] justify-start items-start w-full'}>
                {
                    data.gallery_items?.data.map((item, index) => {
                        return (<ProfileGalleryItem data={item} section_slug={data.slug} per_page={data.gallery_items.per_page} key={index}/>)
                    })
                }
            </div>
        </div>
    );
};

export default ProfileGallerySectioms;

import SelectComponent from "@/components/SelectComponent";
import SearchInput from "@/components/SearchInput.jsx";
import {useSelector} from "react-redux";
import {useWindowSize} from "react-use";
import Pagination from "@/components/Pagination.jsx";
import GaleryItem from "@/components/GaleryItem.jsx";

const categories = [
    {
        id: 1,
        name: 'test',
        subcategories: [
            {
                id: 2,
                name: 'test',
                subcategories: []
            }
        ]
    },
    {
        id: 3,
        name: 'test',
        subcategories: []
    },
    {
        id: 4,
        name: 'test',
        subcategories: []
    },
    {
        id: 5,
        name: 'test',
        subcategories: []
    },
    {
        id: 6,
        name: 'test',
        subcategories: []
    },
];
const sortingOptions = [
    {
        id: 'most_popular',
        name: 'За популярністю'
    },
    {
        id: 'creation_date_asc',
        name: 'Спочатку найдавніші'
    },
    {
        id: 'creation_date_desc',
        name: 'Спочатку найновіші'
    }
];

const galeryItems = {
    current_page: 3,
    data: [
        {
            id: 1,
            title: "test",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolores id illum impedit inventore ipsam iusto laboriosam libero magnam, nam nemo quidem sapiente sunt suscipit tempore totam, unde veniam voluptatibus? Deserunt doloremque et excepturi harum id labore laudantium praesentium provident rerum. Architecto aspernatur commodi consectetur fugiat fugit iste iure molestiae natus officiis pariatur possimus quia reiciendis, repellendus sed sit, ut?",
            photo: '/images/img.png',
            preview: null,
            author: {
                name: "test",
                link: "/"
            },
            comments: {
                count: 10,
                link: "/"
            },
            likes: {
                liked: true,
                count: 10
            },
            pngLink: "/",
            jpgLink: "/"
        },
        {
            id: 2,
            title: "test",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolores id illum impedit inventore ipsam iusto laboriosam libero magnam, nam nemo quidem sapiente sunt suscipit tempore totam, unde veniam voluptatibus? Deserunt doloremque et excepturi harum id labore laudantium praesentium provident rerum. Architecto aspernatur commodi consectetur fugiat fugit iste iure molestiae natus officiis pariatur possimus quia reiciendis, repellendus sed sit, ut?",
            photo: '/images/img.png',
            preview: null,
            author: {
                name: "test",
                link: "/"
            },
            comments: {
                count: 10,
                link: "/"
            },
            likes: {
                liked: false,
                count: 10
            },
            pngLink: "/",
            jpgLink: "/"
        },
        {
            id: 3,
            title: "test",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolores id illum impedit inventore ipsam iusto laboriosam libero magnam, nam nemo quidem sapiente sunt suscipit tempore totam, unde veniam voluptatibus? Deserunt doloremque et excepturi harum id labore laudantium praesentium provident rerum. Architecto aspernatur commodi consectetur fugiat fugit iste iure molestiae natus officiis pariatur possimus quia reiciendis, repellendus sed sit, ut?",
            photo: '/images/img.png',
            preview: null,
            author: {
                name: "test",
                link: "/"
            },
            comments: {
                count: 10,
                link: "/"
            },
            likes: {
                liked: false,
                count: 10
            },
            pngLink: "/",
            jpgLink: "/"
        }
    ],
    first_page_url: "http://example.com?page=1",
    from: 1,
    last_page: 30,
    last_page_url: "http://example.com?page=30",
    links: [
        {
            url: null,
            label: "&laquo; Previous",
            active: false
        },
        {
            url: "http://example.com?page=1",
            label: "1",
            active: false
        },
        {
            url: "http://example.com?page=2",
            label: "2",
            active: false
        },
        {
            url: "http://example.com?page=3",
            label: "3",
            active: true
        },
        {
            url: "http://example.com?page=2",
            label: "Next &raquo;",
            active: false
        }
    ],
    next_page_url: "http://example.com?page=2",
    path: "http://example.com",
    per_page: 3,
    prev_page_url: null,
    to: 3,
    total: 30
}

const Galery = () => {
    const {mode} = useSelector((state) => state.themeMode);
    const iconColor = mode === '' || mode === 'positive' ? '#031945' : (mode === 'negative' ? '#AEC2ED' : '#8FA8DE')
    const {width} = useWindowSize();
    return (
        <>
            <div
                className={`flex justify-center items-center my-[0.5em] w-5/6 ${width > 900 ? 'gap-[1em]' : 'flex-col-reverse gap-[0.5em]'}  mx-auto`}>
                <div
                    className={`flex justify-center items-center ${width > 900 ? 'w-2/3 gap-[1em]' : 'w-full gap-[0.5em]'}  mx-auto`}>
                    <SelectComponent placeholder={'Оберіть категорію'}
                                     options={categories}
                                     className={`select-galery-component w-1/2  ${width > 900 ? 'text-[2em] h-[2em]' : 'text-[1.5em] h-[1.7em]'}`}/>
                    <SelectComponent placeholder={'Сортувати за'}
                                     options={sortingOptions}
                                     className={`select-galery-component w-1/2 ${width > 900 ? 'text-[2em] h-[2em]' : 'text-[1.5em] h-[1.7em]'}`}/>
                </div>

                <SearchInput
                    color={iconColor}
                    iconSize={width > 900 ? 30 : 20}
                    classDivName={`search-block-galery position-relative  ${width > 900 ? 'w-2/3' : 'w-full'}`}
                    classInputName={`search-input-galery ${width > 900 ? 'text-[2em] h-[2em]' : 'text-[1.7em] h-[1.7em]'}`}
                />
            </div>
            {galeryItems.data.map((item) => (
                <GaleryItem key={item.id} item={item}/>
            ))}
            <Pagination {...galeryItems} />
        </>

    );
};

export default Galery;

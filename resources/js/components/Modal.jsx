import {openCloseModal} from "../store/modalSlice.js";
import {useDispatch, useSelector} from "react-redux";
import Icon from "./Icon.jsx";
import {useEffect, useRef} from "react";

const Modal = ({children}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const {mode} = useSelector((state) => state.themeMode);
    let bgMode = '';
    switch (mode) {
        case 'positive':
            bgMode = '#547BCD99';
            break;
        case 'negative':
            bgMode = '#0B328699';
            break;
        case 'dark':
            bgMode = '#0B328699';
            break;
        default:
            bgMode = '#d9d9d999';
    }
    const isOpen = useSelector(state => state.modal.isOpen);

    useEffect(() => {
        if (!isOpen) return;
        function handleOutsideClick(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                dispatch(openCloseModal({open: false}));
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dispatch, isOpen]);

    return isOpen && (
        <div className={`absolute h-full w-full flex items-center justify-center z-50`} style={{ background: bgMode }}>
            <div className="relative mx-auto p-5 w-6/12 max-h-90 shadow-lg rounded-md bg-white" ref={modalRef}>
                <button
                    className="absolute bg-transparent right-[2%] top-[3.5%] m-3 border-none cursor-pointer"
                    onClick={() => dispatch(openCloseModal({open: false}))}
                >
                    <Icon color="#FFFFFF"
                          name="close_modal" size={40}/>

                </button>
                <div className="mt-3 h-[90vh] overflow-y-auto flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

import {useEffect, useRef} from "react";

const DropdownWrapper = ({ children, classPrefix, onClose }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className={`absolute ${classPrefix === 'footer' ? 'top-[0%]' : 'top-[100%]'}`} ref={wrapperRef}>
            {children}
        </div>
    );
};

export default DropdownWrapper;

import {useDispatch, useSelector} from "react-redux";
import {setFillColor, setPenColor} from "@/store/gridSlice.js";

const UsedColors = () => {
    const dispatch = useDispatch();
    const {drawnCells} = useSelector((state) => state.grid);
    const colorsArray = Array.from(new Set(Object.values(drawnCells)));
    const {tool} = useSelector((state) => state.grid);
    const handleChange = (color) => {
        if (tool === "fill") {
            dispatch(setFillColor(color))
        } else {
            dispatch(setPenColor(color));
        }
    }
    return (
        <div
            className={'w-[3em] min-h-[2em] max-h-[2.5em] bg-[#D9D9D9] rounded-[10px] px-[1em] py-[0.25em] flex justify-start items-center gap-[0.5em] flex-wrap overflow-y-auto'}>
            {colorsArray.length ? (
                colorsArray.map((color, index) => (
                    <div key={index}
                         onClick={() => handleChange(color)}
                         style={{background: color,
                             minWidth: '15px',
                             maxWidth: '15px',
                             minHeight: '15px',
                             maxHeight: '15px',
                             cursor: 'pointer'}}
                    ></div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default UsedColors;

import { useDispatch, useSelector } from "react-redux";
import { setGridWidth, setGridHeight } from "@/store/gridSlice";
import Icon from "@/components/Icon.jsx";

const WidthHeightsControls = ({color, data}) => {
    const dispatch = useDispatch();
    const { gridWidth, gridHeight, cellSize } = useSelector((state) => state.grid);
    const widthValue = gridWidth / cellSize;
    const heightValue = gridHeight / cellSize;

    return (
        <div className={'flex justify-end items-end gap-[1em]'}>
            <Icon name={'ruler'} color={color} size={25}/>
            <div className={'flex flex-col justify-start items-start gap-[1em]'}>
                <label htmlFor="widthinput" title={data.width_input_title}>{data.width_input_label}</label>
                <input
                    className={'editor-number-inputs'}
                    value={widthValue}
                    onChange={(e) => dispatch(setGridWidth(Number(e.target.value)))}
                    type="number" min="1" id="widthinput"/>
            </div>
            <div className={'flex flex-col justify-start items-start gap-[1em]'}>
                <label htmlFor="heightinput" title={data.heigh_input_title}>{data.heigh_input_label}</label>
                <input
                    className={'editor-number-inputs'}
                    value={heightValue}
                    onChange={(e) => dispatch(setGridHeight(Number(e.target.value)))}
                    type="number" min="1" id="heightinput"/>
            </div>
        </div>
    );
};

export default WidthHeightsControls;

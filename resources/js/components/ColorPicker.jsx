import React, {useState} from 'react';
import Icon from "@/components/Icon.jsx";
import {ChromePicker} from "react-color";
import {useDispatch, useSelector} from "react-redux";
import {setFillColor, setPenColor} from "@/store/gridSlice.js";

const ColorPicker = ({color, title}) => {
    const dispatch = useDispatch();
    const [showColorPicker, setShowColorPicker] = useState(false);
    const {penColor, tool, fillColor} = useSelector((state) => state.grid);
    const [selectedColor, setSelectedColor] = useState(tool !== "fill" ? penColor : fillColor);
    const handleColorClick = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleColorChange = (newColor) => {
        setSelectedColor(newColor);
        if (tool === "fill") {
            dispatch(setFillColor(selectedColor))
        } else {
            dispatch(setPenColor(selectedColor));
        }
        setShowColorPicker(false);
    };

    return (
        <div className={'position-relative'}>
            <Icon className={'cursor-pointer'} name={'palette'} color={color} size={25}
                  onClick={handleColorClick}
                  title={title}/>
            {showColorPicker && (
                <div style={{position: 'absolute', zIndex: 100}}>
                    <input type="color" value={selectedColor}
                           onChange={(e) => handleColorChange(e.target.value)}/>
                </div>
            )}

        </div>
    );
};

export default ColorPicker;

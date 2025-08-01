import Icon from "@/components/Icon.jsx";
import {useSelector} from "react-redux";
import {CanvasGrid} from "@/components/CanvasGrid.jsx";
import WidthHeightsControls from "@/components/WidthHeightsControls.jsx";
import {commitDrawing, redo, setDrawnCells, setTool, undo} from "@/store/gridSlice.js";
import {useDispatch} from "react-redux";
import UsedColors from "@/components/UsedColors.jsx";
import ColorPicker from "@/components/ColorPicker.jsx";
import {useEffect, useRef} from "react";

const EditorPageSection = ({data}) => {
    const dispatch = useDispatch();
    const {mode} = useSelector((state) => state.themeMode);
    const {gridHeight,gridWidth, drawnCells, margin} = useSelector((state) => state.grid);
    const prevHeightRef = useRef(gridHeight);
    const prevWidthRef = useRef(gridWidth);
    let color = '';
    switch (mode) {
        case 'positive':
            color = '#031945';
            break;
        case 'negative':
            color = '#D9D9D9';
            break;
        case 'dark':
            color = '#AEC2ED';
            break;
        default:
            color = '#031945';

    }
    const toggleTool = (tool) => {
        dispatch(setTool(tool));
    };
    useEffect(() => {
        if (prevHeightRef.current !== gridHeight || prevWidthRef.current !== gridWidth) {
            const deltaH = gridHeight - prevHeightRef.current;
            const deltaW = gridWidth - prevWidthRef.current;
            const newDrawnCells = {};
            Object.entries(drawnCells).forEach(([cell, color]) => {
                let [x, y] = cell.split(",").map(Number);
                const newX = x;
                const newY = y + deltaH;
                if (
                    newX >= margin &&
                    newX < gridWidth + margin &&
                    newY >= margin &&
                    newY < gridHeight + margin
                ) {
                    newDrawnCells[`${newX},${newY}`] = color;
                }
            });
            dispatch(setDrawnCells(newDrawnCells));
            dispatch(commitDrawing());
            prevHeightRef.current = gridHeight;
        }
    }, [dispatch,gridWidth, gridHeight]);
    useEffect(() => {
        dispatch(commitDrawing());
    }, [dispatch]);

    return (
        <div className={'editor-main-div'}>
            <div className={'px-[1em] flex justify-between items-end my-[1em]'}>
                <WidthHeightsControls color={color} data={data} />

                <div className={'flex justify-end items-end gap-[1em]'}>
                    <Icon className={'cursor-pointer'} name={'plus'} color={color} size={25}
                          title={data.new_draft_title}/>
                    <Icon className={'cursor-pointer'} name={'save'} color={color} size={25}
                          title={data.save_draft_title}/>
                </div>

            </div>
            <div className="flex justify-start items-center px-[1em] gap-[1em] my-[1em]">
                <Icon className={'cursor-pointer'} name={'pencil'} color={color} size={25} title={data.pencil_title}
                      onClick={() => toggleTool("pen")}/>
                <Icon className={'cursor-pointer'} name={'paint_fill'} color={color} size={25} title={data.fulfill_title}
                      onClick={() => toggleTool("fill")}/>
                <Icon className={'cursor-pointer'} name={'eraser'} color={color} size={25} title={data.eraser_title}
                      onClick={() => toggleTool("eraser")}/>
                <Icon className={'cursor-pointer'} name={'undo'} color={color} size={25} title={data.undo_title}
                      onClick={() => dispatch(undo())}/>
                <Icon className={'cursor-pointer'} name={'redo'} color={color} size={25} title={data.redo_title}
                      onClick={() => dispatch(redo())}/>
                <Icon className={'cursor-pointer'} name={'trash'} color={color} size={25} title={data.clear_title}
                      onClick={() => dispatch(setDrawnCells({}))}/>
                <ColorPicker color={color} title={data.colors_title}/>
                <UsedColors/>
                <Icon className={'cursor-pointer'} name={'grid'} color={color} size={25}
                      title={data.copyfield_title}
                      onClick={() => toggleTool("selection")}
                />
            </div>
            <div
                className="flex w-[calc(100%-2em)] mx-auto justify-start items-center gap-[1em] bg-[#ffffff] overflow-auto">
                {/* Основная сетка */}
                <CanvasGrid
                    offset={false}
                />
                {/* Смещенная сетка */}
                <CanvasGrid
                    offset={true}
                />
            </div>

        </div>
    );
};

export default EditorPageSection;

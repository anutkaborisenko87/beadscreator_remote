import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCanvasGrid} from "@/hooks/useCanvasGrid";
import {drawGrid} from "@/utils/drawGrid";
import {addCell, commitDrawing, setDrawnCells} from "@/store/gridSlice.js";

import {floodFill} from "@/utils/floodFill.js";

export const CanvasGrid = ({offset = false}) => {
    const dispatch = useDispatch();
    const {gridWidth, gridHeight, cellSize, penColor, drawnCells, tool, fillColor, margin} = useSelector(
        (state) => state.grid
    );
    const canvasRef = useCanvasGrid(gridWidth, gridHeight, cellSize, margin, offset);
    const [isDrawing, setIsDrawing] = useState(false);
    let cursorUrl = '';
    switch (tool) {
        case 'pen':
            cursorUrl = '/images/icons/pencil-line.svg';
            break;
        case 'fill':
            cursorUrl = '/images/icons/paint-fill.svg';
            break;
        case 'eraser':
            cursorUrl = '/images/icons/eraser-line.svg';
            break;
        default:
            cursorUrl = '/images/icons/pencil-line.svg';
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx, gridWidth, gridHeight, cellSize, margin, offset);
        ctx.save();

        Object.entries(drawnCells).forEach(([cell, color]) => {
            let [x, y] = cell.split(",").map(Number);
            if (offset) {
                const colIndex = Math.floor((x - margin) / cellSize);
                const rowIndex = Math.floor((gridHeight + margin - y) / cellSize);
                const baseX = colIndex * cellSize;
                const shift = rowIndex * (cellSize / 2);
                x = margin + ((((baseX - shift) % gridWidth) + gridWidth) % gridWidth);
            }
            ctx.fillStyle = color;
            ctx.fillRect(x, y, cellSize, cellSize);
        });
        ctx.restore();
    }, [gridWidth, gridHeight, cellSize, margin, offset, drawnCells, canvasRef]);

    const getCellCoordinates = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;
        const gridLeft = margin;
        const gridRight = gridWidth + margin;
        const gridTop = margin - cellSize;
        const gridBottom = gridHeight + margin;
        if (localX < gridLeft || localX > gridRight || localY < gridTop || localY > gridBottom) {
            return null;
        }
        const gridFieldHeight = gridBottom - gridTop;
        const totalRows = Math.floor(gridFieldHeight / cellSize);
        const rowIndex = Math.floor((gridBottom - localY) / cellSize) + 1;
        if (rowIndex < 0 || rowIndex >= totalRows) return null;
        const gridWidthRow = gridRight - gridLeft;
        const totalCols = Math.floor((gridWidthRow - cellSize) / cellSize) + 1;
        const colIndex = Math.floor((localX - gridLeft) / cellSize);
        if (colIndex < 0 || colIndex >= totalCols) return null;
        const cellX = gridLeft + colIndex * cellSize;
        const cellY = gridBottom - rowIndex * cellSize;
        if (canvas.id === "offset-canvas") {
            const gridLeft = margin;
            const gridRight = gridWidth + margin;
            const gridWidthRow = gridRight - gridLeft;
            const baseX = colIndex * cellSize;
            const shift =
                rowIndex % 2 === 0
                    ? rowIndex * (cellSize / 2)
                    : rowIndex * (cellSize / 2) + (cellSize / 2);
            const storedX =
                gridLeft + ((((baseX + shift) % gridWidthRow) + gridWidthRow) % gridWidthRow);
            return `${storedX},${cellY}`;
        }
        return `${cellX},${cellY}`;
    };

    const startDrawing = (event) => {
        const cell = getCellCoordinates(event);
        if (!cell) return;
        if (tool === "fill") {
            const targetColor = drawnCells[cell] || "white";
            const gridBounds = {
                left: margin,
                right: gridWidth + margin,
                top: margin,
                bottom: gridHeight + margin
            };
            const newCells = floodFill(cell, targetColor, fillColor, drawnCells, cellSize, gridBounds);
            dispatch(setDrawnCells(newCells));
            dispatch(commitDrawing());
        } else {
            setIsDrawing(true);
            if (tool === "eraser") {
                const newDrawnCells = {...drawnCells};
                delete newDrawnCells[cell];
                dispatch(setDrawnCells(newDrawnCells));
            } else {
                dispatch(addCell({cell, color: penColor}));
            }
        }

    };

    const draw = (event) => {
        if (!isDrawing) return;
        const cell = getCellCoordinates(event);
        if (!cell) return;
        if (tool === "eraser") {
            const newDrawnCells = {...drawnCells};
            delete newDrawnCells[cell];
            dispatch(setDrawnCells(newDrawnCells));
        } else {
            const newDrawnCells = {...drawnCells, [cell]: penColor};
            dispatch(setDrawnCells(newDrawnCells));
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        dispatch(commitDrawing());
    };

    return (
        <canvas
            id={offset ? "offset-canvas" : "normal-canvas"}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ cursor: `url(${cursorUrl}) 10 30, auto` }}
        />
    );
};


export default CanvasGrid;

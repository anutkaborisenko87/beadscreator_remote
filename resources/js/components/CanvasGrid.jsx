import {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCanvasGrid } from "../hooks/useCanvasGrid";
import { drawGrid } from "../utils/drawGrid";
import { addCell, commitDrawing, setDrawnCells } from "../store/gridSlice.js";
import { floodFill } from "../utils/floodFill";

export const CanvasGrid = ({ offset = false }) => {
    const dispatch = useDispatch();
    const {
        gridWidth,
        gridHeight,
        cellSize,
        penColor,
        drawnCells,
        tool,
        fillColor,
        margin,
    } = useSelector((state) => state.grid);
    const canvasRef = useCanvasGrid(gridWidth, gridHeight, cellSize, margin, offset);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState(null);
    const [selectionEnd, setSelectionEnd] = useState(null);
    const [clipboard, setClipboard] = useState(null);
    const selectionRef = useRef({ start: null, end: null });
    let cursorUrl = "";
    switch (tool) {
        case "pen":
            cursorUrl = "/images/icons/pencil-line.svg";
            break;
        case "fill":
            cursorUrl = "/images/icons/paint-fill.svg";
            break;
        case "eraser":
            cursorUrl = "/images/icons/eraser-line.svg";
            break;
        case "selection":
            cursorUrl = "/images/icons/layout-grid-2-line.svg";
            break;
        default:
            cursorUrl = "/images/icons/pencil-line.svg";
    }

    const getCellCoordinates = (event) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;
        const gridLeft = margin;
        const gridRight = gridWidth + margin/2;
        const gridTop = margin - cellSize;
        const gridBottom = gridHeight + margin/2;
        if (localX < gridLeft || localX > gridRight || localY < gridTop || localY > gridBottom) {
            return null;
        }
        const colIndex = Math.floor((localX - gridLeft) / cellSize);
        const rowIndex = Math.floor((gridBottom - localY) / cellSize);
        const cellX = gridLeft + colIndex * cellSize;
        const cellY = gridBottom - rowIndex * cellSize;

        let finalX = cellX;
        if (canvas.id === "offset-canvas") {
            const gridWidthRow = gridRight - gridLeft;
            const baseX = colIndex * cellSize;
            const shift =
                rowIndex % 2 === 0
                    ? rowIndex * (cellSize / 2)
                    : rowIndex * (cellSize / 2) + cellSize / 2;
            finalX = gridLeft + ((((baseX + shift) % gridWidthRow) + gridWidthRow) % gridWidthRow);
        }

        return { cellKey: `${finalX},${cellY}`, x: finalX, y: cellY, col: colIndex, row: rowIndex };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
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

        if (selectionStart && selectionEnd && tool === "selection") {
            const selLeft = Math.min(selectionStart.x, selectionEnd.x);
            const selTop = Math.min(selectionStart.y, selectionEnd.y);
            const selRight = Math.max(selectionStart.x, selectionEnd.x) + cellSize;
            const selBottom = Math.max(selectionStart.y, selectionEnd.y) + cellSize;
            const selWidth = selRight - selLeft;
            const selHeight = selBottom - selTop;

            ctx.strokeStyle = "rgba(0, 0, 255, 0.8)";
            ctx.lineWidth = 2;
            ctx.strokeRect(selLeft, selTop, selWidth, selHeight);
            ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
            ctx.fillRect(selLeft, selTop, selWidth, selHeight);
        }

        ctx.restore();
    }, [gridWidth, gridHeight, cellSize, margin, offset, drawnCells, tool, selectionStart, selectionEnd, canvasRef]);

    useEffect(() => {
        if (tool !== "selection") {
            setSelectionStart(null);
            setSelectionEnd(null);
            setIsSelecting(false);
        }
    }, [tool]);

    const startDrawing = (event) => {
        const cell = getCellCoordinates(event);
        if (!cell) return;
        if (tool === "fill") {
            const targetColor = drawnCells[cell.cellKey] || "white";
            const gridBounds = {
                left: margin,
                right: gridWidth + margin,
                top: margin,
                bottom: gridHeight + margin,
            };
            const newCells = floodFill(cell.cellKey, targetColor, fillColor, drawnCells, cellSize, gridBounds);
            dispatch(setDrawnCells(newCells));
            dispatch(commitDrawing());
        } else {
            setIsDrawing(true);
            if (tool === "eraser") {
                const newDrawnCells = { ...drawnCells };
                delete newDrawnCells[cell.cellKey];
                dispatch(setDrawnCells(newDrawnCells));
            } else {
                dispatch(addCell({ cell: cell.cellKey, color: penColor }));
            }
        }
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const cell = getCellCoordinates(event);
        if (!cell) return;
        if (tool === "eraser") {
            const newDrawnCells = { ...drawnCells };
            delete newDrawnCells[cell.cellKey];
            dispatch(setDrawnCells(newDrawnCells));
        } else {
            const newDrawnCells = { ...drawnCells, [cell.cellKey]: penColor };
            dispatch(setDrawnCells(newDrawnCells));
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        dispatch(commitDrawing());
    };

    const handleSelectionClick = (e) => {
        const cell = getCellCoordinates(e);
        if (!cell) return;
        if (!selectionRef.current.start) {
            selectionRef.current.start = cell;
            selectionRef.current.end = cell;
            setSelectionStart(cell);
            setSelectionEnd(cell);
            setIsSelecting(true);
        } else if (isSelecting) {
            selectionRef.current.end = cell;
            setSelectionEnd(cell);
            setIsSelecting(false);
        } else {
            selectionRef.current.start = cell;
            selectionRef.current.end = cell;
            setSelectionStart(cell);
            setSelectionEnd(cell);
            setIsSelecting(true);
        }
    };

    const handleSelectionMouseMove = (e) => {
        if (isSelecting && selectionStart) {
            const cell = getCellCoordinates(e);
            if (cell) {
                setSelectionEnd(cell);
            }
        }
    };
    const copySelection = () => {
        if (!selectionRef.current.start || !selectionRef.current.end) return;
        const { start, end } = selectionRef.current;
        const minX = Math.min(start.x, end.x);
        const minY = Math.min(start.y, end.y);
        const maxX = Math.max(start.x, end.x);
        const maxY = Math.max(start.y, end.y);
        const minCol = Math.floor((minX - margin) / cellSize);
        const maxCol = Math.floor((maxX - margin) / cellSize);
        const minRow = Math.floor((gridHeight + margin - maxY) / cellSize);
        const maxRow = Math.floor((gridHeight + margin - minY) / cellSize);

        const copied = {};
        Object.entries(drawnCells).forEach(([cellKey, color]) => {
            const [x, y] = cellKey.split(",").map(Number);
            const col = Math.floor((x - margin) / cellSize);
            const row = Math.floor((gridHeight + margin - y) / cellSize);
            if (col >= minCol && col <= maxCol && row >= minRow && row <= maxRow) {
                const relCol = col - minCol;
                const relRow = row - minRow;
                copied[`${relCol},${relRow}`] = color;
            }
        });
        console.log("copied", copied);
        setClipboard(copied);
    };

    /**
     * Pastes the contents of the clipboard onto the drawing grid at the specified target cell.
     *
     * The function adjusts the position of the clipboard contents relative to the target cell,
     * and merges it into the current set of drawn cells. If there is no clipboard data or a target cell
     * is not provided, the function returns without making any changes.
     *
     * @function
     * @param {Object} targetCell - The cell on the grid onto which the clipboard contents should be pasted.
     * @param {number} targetCell.col - The column index of the target cell.
     * @param {number} targetCell.row - The row index of the target cell.
     */
    const pasteSelection = (targetCell) => {
        if (!clipboard || !targetCell) return;
        const newCells = { ...drawnCells };
        Object.entries(clipboard).forEach(([relKey, color]) => {
            const [relCol, relRow] = relKey.split(",").map(Number);
            const newCol = targetCell.col + relCol;
            const newRow = targetCell.row + relRow;
            const cellX = margin + newCol * cellSize;
            const cellY = (gridHeight + margin) - newRow * cellSize;
            newCells[`${cellX},${cellY}`] = color;
        });
        dispatch(setDrawnCells(newCells));
        dispatch(commitDrawing());
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (tool !== "selection") return;
            if (e.ctrlKey && e.code === "KeyC") {
                e.preventDefault();
                copySelection();
            }
            if (e.ctrlKey && e.code === "KeyV") {
                e.preventDefault();
                if (selectionEnd) {
                    pasteSelection(selectionEnd);
                } else {
                    console.log("No target cell for paste");
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [tool, clipboard]);

    const handleContextMenu = (e) => {
        if (tool !== "selection") return;
        e.preventDefault();
    };

    return (
        <canvas
            id={offset ? "offset-canvas" : "normal-canvas"}
            ref={canvasRef}
            onMouseDown={tool === "selection" ? handleSelectionClick : startDrawing}
            onMouseMove={tool === "selection" ? handleSelectionMouseMove : draw}
            onMouseUp={tool === "selection" ? undefined : stopDrawing}
            onMouseLeave={tool === "selection" ? undefined : stopDrawing}
            onContextMenu={handleContextMenu}
            style={{ cursor: `url(${cursorUrl}) 10 15, auto` }}
        />
    );
};

export default CanvasGrid;

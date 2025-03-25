import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    margin: 20,
    gridWidth: 300,
    gridHeight: 300,
    cellSize: 10,
    penColor: "#0000ff",
    fillColor: "#0000ff",
    drawnCells: {}, // теперь обычный объект вместо new Set() или Map()
    undoStack: [],
    redoStack: [],
    tool: "pen"
};

const gridSlice = createSlice({
    name: "grid",
    initialState,
    reducers: {
        setGridWidth: (state, action) => {
            state.gridWidth = action.payload * state.cellSize;
        },
        setGridHeight: (state, action) => {
            state.gridHeight = action.payload * state.cellSize;
        },
        setPenColor: (state, action) => {
            state.penColor = action.payload;
        },
        setDrawnCells: (state, action) => {
            state.drawnCells = action.payload;
        },
        addCell: (state, action) => {
            const { cell, color } = action.payload;
            state.drawnCells[cell] = color;

        },
        commitDrawing: (state) => {
            state.undoStack.push({ ...state.drawnCells });
            state.redoStack = [];
        },
        undo: (state) => {
            if (state.undoStack.length === 0) return;
            while (
                state.undoStack.length > 0 &&
                JSON.stringify(state.undoStack[state.undoStack.length - 1]) === JSON.stringify(state.drawnCells)
                ) {
                state.undoStack.pop();
            }
            if (state.undoStack.length === 0) return;
            const previous = state.undoStack.pop();
            state.redoStack.push({ ...state.drawnCells });
            state.drawnCells = previous;
        },
        redo: (state) => {
            if (state.redoStack.length === 0) return;
            state.undoStack.push({ ...state.drawnCells });
            const next = state.redoStack.pop();
            state.drawnCells = next;
        },
        setTool: (state, action) => {
            state.tool = action.payload;
        },
        setFillColor: (state, action) => {
            state.fillColor = action.payload;
        }
    },
});

export const {
    setGridWidth,
    setGridHeight,
    setPenColor,
    setDrawnCells,
    addCell,
    commitDrawing,
    undo,
    redo,
    setTool,
    setFillColor
} = gridSlice.actions;
export default gridSlice.reducer;

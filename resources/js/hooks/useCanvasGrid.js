import { useEffect, useRef } from "react";
import { drawGrid } from "../utils/drawGrid";

/**
 * A custom hook for managing and rendering a grid on a canvas element.
 *
 * @param {number} width - The width of the grid in pixels.
 * @param {number} height - The height of the grid in pixels.
 * @param {number} cellSize - The size of each cell in the grid, in pixels.
 * @param {number} margin - The margin around the grid, in pixels.
 * @param {number} offset - The offset applied to grid lines for additional alignment or spacing.
 * @returns {React.MutableRefObject<HTMLCanvasElement | null>} A ref object associated with the canvas element.
 *
 * The hook dynamically updates the canvas dimensions and redraws the grid whenever
 * the input parameters change. It also handles window resize events to appropriately
 * adjust the canvas and redraw the grid.
 */
export const useCanvasGrid = (width, height, cellSize, margin, offset) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = width + margin * 2;
        canvas.height = height + margin * 2;

        drawGrid(ctx, canvas.width, canvas.height, cellSize, margin, offset);

        const handleResize = () => {
            canvas.width = width + margin * 2;
            canvas.height = height + margin * 2;
            drawGrid(ctx, canvas.width, canvas.height, cellSize, margin, offset);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width, height, cellSize, margin, offset]);

    return canvasRef;
};

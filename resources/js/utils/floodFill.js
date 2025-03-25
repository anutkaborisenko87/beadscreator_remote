/**
 * Performs a flood fill algorithm starting from the given cell, filling all connected cells
 * of the target color with the specified fill color, while staying within the grid boundaries.
 *
 * @param {string} startCell - The starting cell for the flood fill, specified as a string in "x,y" format.
 * @param {string} targetColor - The color of the cells to be filled.
 * @param {string} fillColor - The color to fill the target cells with.
 * @param {Object} drawnCells - An object representing the current state of the grid with cell colors.
 * @param {number} cellSize - The size of each cell in the grid.
 * @param {Object} gridBounds - An object defining the bounds of the grid with `left`, `right`, `top`, and `bottom` properties.
 * @return {Object} - A new object representing the updated state of the grid with the applied flood fill.
 */
export function floodFill(startCell, targetColor, fillColor, drawnCells, cellSize, gridBounds) {
    if (targetColor === fillColor) return drawnCells;
    const newCells = { ...drawnCells };

    const getNeighbors = (cell) => {
        const [x, y] = cell.split(",").map(Number);
        const potential = [
            { cell: `${x - cellSize},${y}`, x: x - cellSize, y },
            { cell: `${x + cellSize},${y}`, x: x + cellSize, y },
            { cell: `${x},${y - cellSize}`, x, y: y - cellSize },
            { cell: `${x},${y + cellSize}`, x, y: y + cellSize }
        ];
        return potential.filter(n =>
            n.x >= gridBounds.left &&
            n.x < gridBounds.right &&
            n.y >= gridBounds.top &&
            n.y < gridBounds.bottom
        ).map(n => n.cell);
    };

    const stack = [startCell];

    while (stack.length > 0) {
        const cell = stack.pop();
        if ((newCells[cell] || "white") === targetColor) {
            newCells[cell] = fillColor;
            const neighbors = getNeighbors(cell);
            neighbors.forEach(neighbor => {
                if ((newCells[neighbor] || "white") === targetColor) {
                    stack.push(neighbor);
                }
            });
        }
    }
    return newCells;
}

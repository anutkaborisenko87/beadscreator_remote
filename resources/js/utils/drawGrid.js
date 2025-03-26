/**
 * Draws a grid on the given canvas context with customizable cell size, margin, and optional offset.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D drawing context on which the grid will be drawn.
 * @param {number} width - The width of the grid area to be drawn.
 * @param {number} height - The height of the grid area to be drawn.
 * @param {number} cellSize - The size of each cell in the grid.
 * @param {number} margin - The margin space around the grid.
 * @param {boolean} [offset=false] - Whether to offset alternate rows of the grid to create a staggered effect.
 */
export const drawGrid = (ctx, width, height, cellSize, margin, offset = false) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    for (let y = height + margin; y >= margin; y -= cellSize) {
        let offsetX = offset && ((height - y) / cellSize) % 2 === 0 ? margin + cellSize / 2 : margin;
        ctx.beginPath();
        ctx.moveTo(offsetX, y);
        ctx.lineTo(width + margin, y);
        ctx.lineWidth = (!offset && (height + margin - y) % (cellSize * 5) === 0) ? 2 : 1;
        ctx.stroke();

        for (let x = offsetX; x <= width + margin; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, Math.max(y - cellSize, margin));
            ctx.lineWidth = (!offset && (x - margin) % (cellSize * 5) === 0) ? 2 : 1;
            ctx.stroke();
        }
    }

    if (!offset) {
        ctx.fillStyle = "black";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";

        for (let x = margin; x <= width + margin; x += cellSize * 5) {
            if ((x - margin) / cellSize !== 0) {
                ctx.fillText((x - margin) / cellSize, x, height + margin + 10);
            }
        }

        ctx.textAlign = "right";
        for (let y = height + margin; y >= margin; y -= cellSize * 5) {
            let yValue = (height + margin - y) / cellSize;
            ctx.fillText(yValue, margin - 5, y + 3);
        }
    }

    ctx.beginPath();
    ctx.moveTo(margin, height);
    ctx.lineTo(width, height);
    ctx.stroke();
};

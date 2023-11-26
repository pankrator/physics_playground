class Floor {
    y: number

    constructor(y: number) {
        this.y = y;
    }

    draw(width: number, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx?.moveTo(0,this.y);
        ctx?.lineTo(width, this.y);
        ctx?.stroke();
    }
}
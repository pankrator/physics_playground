class Orb extends PhysicsObject {
    radius: number

    constructor(currentPosition: Vector, radius: number) {
        super(currentPosition)
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(this.currentPosition.x, this.currentPosition.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
}
let width = 2000;

function init(ctx: CanvasRenderingContext2D | null, mouse: Vector) {
    let floor = new Floor(900);
    let ball = new Ball(new Vector(500, 50), 20);
    let paddle = new Paddle(new Vector());

    let solver = new Solver(60);
    let orb = new Orb(new Vector(650, 500), 40);

    solver.addObject(orb);

    update(solver, orb,mouse, floor, ball, paddle, ctx);
}

function update(solver: Solver, orb: Orb, mouse: Vector, floor: Floor, ball: Ball, paddle: Paddle, ctx: CanvasRenderingContext2D | null) {
    // ball.update(width, floor);
    // paddle.update(mouse, ball);

    ctx?.clearRect(0,0,width,1000);

    solver.update();
    solver.draw(ctx);
    orb.draw(ctx);

    // floor.draw(width, ctx as CanvasRenderingContext2D);
    // ball.draw(ctx as CanvasRenderingContext2D);
    // paddle.draw(ctx as CanvasRenderingContext2D);

    requestAnimationFrame(() => {
        update(solver, orb, mouse, floor, ball, paddle, ctx);
    });
}

window.onload = () => {
    let canvas: HTMLCanvasElement;
    canvas = (document.getElementById("area") as HTMLCanvasElement);
    width = canvas.width;
    let ctx = canvas.getContext("2d");
    let mouse = new Vector();

    canvas.addEventListener("mousemove", (ev) => {
        mouse.x = ev.offsetX;
        mouse.y = ev.offsetY;
    }, true);

    init(ctx, mouse);
}


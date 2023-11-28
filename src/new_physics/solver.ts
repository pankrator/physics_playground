class Solver {
    private frameRate: number = 60;
    private objects: PhysicsObject[]

    constructor(frameRate) {
        this.frameRate = frameRate;
        this.objects = [];
    }

    update() {
        let dt = 1 / this.frameRate;
        let subSteps = 2;
        let sub_dt = dt/subSteps;
        for (let i = subSteps; i >= 0; i--) {
            this.applyGravity();
            this.applyConstraints();
            this.updatePositions(sub_dt);
        }
    }

    updatePositions(dt: number) {
        for (let obj of this.objects) {
            obj.update(dt);
        }
    }

    applyGravity() {
        for (let obj of this.objects) {
            obj.accelerate(new Vector(0, 100));
        }
    }

    applyConstraints() {
        let center = new Vector(500, 500);
        let radius = 500;

        for (let obj of this.objects) {
            let direction = obj.currentPosition.subtract(center) as Vector;
            let dist = direction.length();
            if (dist > radius - (obj as Orb).radius) {
                let normalizedDir = direction.normalized();
                let translate = normalizedDir.multiply(radius - (obj as Orb).radius);
                obj.currentPosition = center.add(translate);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        let center = new Vector(500, 500);
        let radius = 500;

        ctx.fillStyle = "gray";
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    addObject(obj: PhysicsObject) {
        this.objects.push(obj);
    }
}
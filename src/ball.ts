class Ball {
    position: Vector;
    accelaration: Vector;
    velocity: Vector;
    appliedForce: Vector;
    radius: number;

    falling: boolean;
    hittedFloor: boolean;

    constructor(position: Vector, r) {
        this.accelaration = Vector.zero;
        this.velocity = Vector.zero;
        this.appliedForce = null;
        this.position = position;
        this.radius = r;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        if (this.position.y < 0) {
            ctx.arc(this.position.x, this.radius, this.radius, 0, Math.PI * 2);
        } else {
            ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        }
        ctx.fill();
        if (this.position.y < 0) {
            ctx.fillStyle="black";
            ctx.font = "18px Arial";
            ctx.fillText(Math.floor(Math.abs(this.position.y)).toString(), this.position.x + 30, this.radius);
        }

        let dir = this.velocity.normalized();
        let speed = this.velocity.length();
        let newDir = dir.multiply(speed).multiply(10);
        let endPoint = this.position.add(newDir);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
    }

    update(width: number, floor: Floor) {
        this.accelaration = Vector.zero;
        if (this.appliedForce) {
            this.accelaration = this.appliedForce.clone();
            this.appliedForce = null;
        }

        this.gravity();
        this.checkFloor(floor);
        this.floorHit();

        // console.log(this.velocity);
        this.velocity = this.velocity.add(this.accelaration);
        // if (this.velocity.length() > 6) {
        //     this.velocity = this.velocity.normalized().multiply(6);
        // }

        this.velocity = this.velocity.multiply(0.98788);
        this.position = this.position.add(this.velocity);

        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
    }

    checkFloor(floor: Floor) {
        if (this.position.y + this.radius >= floor.y) {
            this.falling = false;
            this.hittedFloor = true;

            this.position.y = floor.y-this.radius;
        } else {
            this.falling = true;
        }
    }

    floorHit() {
        if (this.hittedFloor) {
            this.hittedFloor = false;
            let downSpeed = this.velocity.y;
            // let force = this.velocity.negated().multiply(1.6);
            let force = Vector.up.negated();
            // let normal = Vector.up.negated();
            // let force = this.velocity.subtract(normal.multiply(2*this.velocity.dot(normal))).normalized();
            // let force = this.velocity.normalized().negated().multiply(downSpeed*1.7);

            this.accelaration = this.accelaration.add(force.multiply(downSpeed*1.6));
        }
    }

    gravity() {
        let gravityForce = Vector.down;
        // gravityForce = gravityForce.rotate(Math.PI/4);
        gravityForce = gravityForce.multiply(0.37);
        gravityForce = gravityForce.negated();

        this.accelaration = this.accelaration.add(gravityForce);
    }

    applyForce(f: Vector) {
        this.appliedForce = f;
        console.log("applied");
        // this.velocity = this.velocity.add(f)
    }
}





//          o



// ----------------------
class Paddle {
    position: Vector;
    lastPosition: Vector;
    framesPositions: Vector[];
    colliding: boolean;
    collisionDirection: Vector;
    size: number
    
    applyForce: Vector;

    constructor(position: Vector) {
        this.position = position;
        this.lastPosition = Vector.zero;
        this.framesPositions = [];
        this.colliding = false;
        this.collisionDirection = Vector.zero;
        this.size = 50;
        this.applyForce = Vector.zero;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        if (this.colliding) {
            ctx.fillStyle = "yellow";
        }
        ctx.fillRect(this.position.x, this.position.y, this.size * 2, this.size * 2);


        let dir = this.position.subtract(this.framesPositions[0]);
        let speed = this.position.distanceTo(this.framesPositions[0]);

        let newDir = dir.normalized().multiply(speed);
        let endPoint = this.position.add(newDir);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();


        newDir = this.applyForce;
        endPoint = this.position.add(newDir);
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
    }

    update(mouse: Vector, ball: Ball) {
        this.framesPositions.push(this.position);
        if (this.framesPositions.length > 1) {
            this.framesPositions.shift();
        }
        this.position = mouse.clone();


        this.collideWithBall(ball);
        // ball.applyForce()
    }

    collideWithBall(ball: Ball) {
        // let x1 = this.position.x;
        // let y1 = this.position.y;

        let center = this.position.add(new Vector(this.size, this.size)) as Vector;
        let collisionDistance = ball.position.distanceTo(center);

        if (collisionDistance <= this.size + ball.radius) {
            this.colliding = true;
            let paddleCenter = this.position.add(this.size);
            let paddleDir = center.subtract(this.framesPositions[0].add(this.size)) as Vector;
            // console.log(paddleDir);
            // let paddleDir = paddleCenter.subtract(this.framesPositions[0].add(this.size)).normalized() as Vector;
            // let paddleSpeed = paddleDir.length() / 10;
            let paddleSpeed = 0;
            paddleDir = paddleDir.multiply(0.01);
            // paddleDir = paddleDir.normalized();

            this.collisionDirection = ball.position.subtract(center).normalized();
            // console.log(this.collisionDirection);

            // let ballDir = ball.velocity.negated() as Vector;
            let ballDir = ball.velocity as Vector;

            // Note: finding ball reflected direction vector
            let normal = Vector.zero;

            let moveSpeed = ball.velocity.length();
            let ballVirtualPos = ball.position.clone();
            while (true) {
                if (ballVirtualPos.y <= center.y-this.size) {
                    normal = Vector.down;
                    // moveSpeed = ball.velocity.y;
                    console.log("up");
                    break;
                } else if (ballVirtualPos.y >= center.y+this.size) {
                    normal = Vector.up;
                    // moveSpeed = ball.velocity.y;
                    console.log("down");
                    break;
                } else if (ballVirtualPos.x <= center.x - this.size) {
                    normal = Vector.left;
                    // moveSpeed = ball.velocity.x;
                    console.log("left");
                    break;
                } else if (ballVirtualPos.x >= center.x + this.size) {
                    normal = Vector.right;
                    // moveSpeed = ball.velocity.x;
                    console.log("right");
                    break;
                } else { // inside
                    ballVirtualPos = ballVirtualPos.subtract(ball.velocity);
                }
            }

            // let reflectedDir = ballDir.clone().negated().normalized() as Vector;
            // console.log(reflectedDir);
            // console.log("rot angle",reflectedDir.angleTo(normal));
            // let asd = normal.multiply(ballDir.dot(normal)).multiply(2);
            // reflectedDir = ballDir.subtract(asd);

            // reflectedDir = reflectedDir.rotate(2*reflectedDir.angleTo(normal)).normalized();
            // this.applyForce = reflectedDir;
            // this.applyForce = reflectedDir.multiply(30);
            // End


            let moveDir = normal;

            // moveDir = ballDir.negated().multiply(2).add(normal).add(paddleDir);
            // moveDir = ballDir.negated().multiply(1.6).add(normal).add(this.collisionDirection.multiply(1)).add(paddleDir);

            moveDir = moveDir.add(this.collisionDirection.multiply(0.02));
            moveDir = moveDir.add(paddleDir);
            // moveDir = moveDir.normalized().
            moveDir = moveDir.multiply(((moveSpeed*1.6)+(paddleSpeed))) as Vector;


            if (moveDir.length() < collisionDistance) {
                if (normal.equals(Vector.down)) {
                    ball.position.y = center.y - this.size - ball.radius;
                } else if (normal.equals(Vector.up)) {
                    ball.position.y = center.y + this.size + ball.radius;
                } else if (normal.equals(Vector.left)) {
                    ball.position.x = center.x - this.size - ball.radius;
                } else if (normal.equals(Vector.right)) {
                    ball.position.x = center.x + this.size + ball.radius;
                }
            //     let newForce = (ball.radius + this.size - collisionDistance);
            //     moveDir = moveDir.normalized().multiply(newForce+ ((moveSpeed)+(paddleSpeed)));
            //     console.log("whyyy");
            }

            let len = moveDir.length();
            let maxSpeed = 20;
            moveDir = moveDir.normalized().multiply(Math.min(len, maxSpeed));

            this.applyForce = moveDir.multiply(20);
            ball.applyForce(moveDir);
            console.log(normal, this.collisionDirection, moveDir, ballDir);

        } else {
            this.colliding = false;
        }
    }
}
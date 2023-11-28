class PhysicsObject {
    currentPosition: Vector
    oldPosition: Vector
    acceleration: Vector

    constructor(currentPosition: Vector) {
        this.currentPosition = currentPosition;
        this.oldPosition = currentPosition;
        this.acceleration = Vector.zero;
    }

    update(dt: number) {
        let velocity = this.currentPosition.subtract(this.oldPosition).multiply(0.99985) as Vector;
        this.oldPosition = this.currentPosition;
        this.currentPosition = this.currentPosition.add(velocity.add(this.acceleration.multiply(dt*dt)));

        this.acceleration = Vector.zero;
    }

    accelerate(vec: Vector) {
        this.acceleration = this.acceleration.add(vec);
    }
}
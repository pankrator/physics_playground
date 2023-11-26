class Solver {
    private frameRate: number = 60;
    private objects: any[]

    constructor(frameRate) {
        this.frameRate = frameRate;
    }

    update() {
        let dt = 1 / this.frameRate;
        let subSteps = 2;
        let sub_dt = dt/subSteps;
        for (let i = subSteps; i >= 0; i--) {
            this.applyGravity();
        }
    }

    applyGravity() {
        for (let obj of this.objects) {
            obj.accelerate(new Vector(0, 10))
        }
    }

    addObject(obj) {
        this.objects.push(obj);
    }
}
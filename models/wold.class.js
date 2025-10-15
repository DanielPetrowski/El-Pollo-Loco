class World {

    character = new characters();
    level = level1;


    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.World = this
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects)
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addtomap(this.character);
        this.ctx.translate(-this.camera_x, 0)







        let self = this
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addtomap(o)
        })
    }

    addtomap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0)
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }

    }
}
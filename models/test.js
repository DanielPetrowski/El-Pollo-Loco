/*alle klassen sind seperate js datein 
warum wird mir nur der Background angezeigt aber nicht der charakter oder die enemys sowie der status balken 
hir meine datein 

class StatusBar extends DrawableObject{
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ]

    constructor(){
        super();
       this.loadImages(this.IMAGES);
       this.x = 100;
       this.y = 100;
       this.setPercentage(100);
    }

    setPercentage (percentage) {
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5
        } else if ( this.percentage > 80){
            return 4
        } else if ( this.percentage > 60){
            return 3
        } else if ( this.percentage > 40){
            return 2
        } else if ( this.percentage > 20){
            return 1
        } else {
            return 0
        }
    }
}

class DrawableObject {
    img;
    imageCache = {}
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


     loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

    }

        drawFrame(ctx) {
        if(this instanceof characters || this instanceof Chicken || this instanceof Endboss){
        ctx.beginPath();
        ctx.lineWidth = "10";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }
    
     loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path
            this.imageCache[path] = img;

        });

    }
}

class MoveableObjects extends DrawableObject {
  
    
 
    
    
    speed = 0.99;
    otherDirection = false
    speedY = 0;
    acceleration = 2
    energy = 100

    lastHit = 0

    applyGravaty() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        return this.y < 135
    }


   

    


    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height> mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }
    hit(){
        this.energy -= 20
        if(this.energy < 0){
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime()
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed - 1000;
        return timepassed < 5
    }

    isDead(){
        return this.energy == 0
    }


   

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false

    }

    moveLeft() {

        this.x -= this.speed;
        this.otherDirection = true

    }
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

    jump() {
        this.speedY = 20
    }

}*/

class Chicken extends MoveableObjects{
     height = 50
     width = 50
    y = 370;

       IAMGES_WALKING = [
            `img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`,
             `img/3_enemies_chicken/chicken_normal/1_walk/2_w.png`,
             `img/3_enemies_chicken/chicken_normal/1_walk/3_w.png`,
           
        ];

        

    constructor(){
       
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`)

       this.x = 200 +Math.random()*500;
       this.speed = 0.99 + Math.random()*0.4

        this.loadImages(this.IAMGES_WALKING);

        this.animate();
    }

        animate(){
        setInterval(() => {
            let i = this.currentImage % this.IAMGES_WALKING.length;
            let path = this.IAMGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++
        }, 150)
        this.moveLeft();
    }
    


}
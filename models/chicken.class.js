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
            this.moveLeft()
            this.otherDirection = false
        }, 1000 / 60
        )

        setInterval(() => {
           this.playAnimation(this.IAMGES_WALKING);
        }, 150)
        this.moveLeft();
    }
    


}
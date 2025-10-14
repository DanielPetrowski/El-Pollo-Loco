class characters extends MoveableObjects{
    height = 280
    y = 155
    speed = 5
    IAMGES_WALKING = [
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png',
        ];

        World;

    constructor(){
        super().loadImage(`img/2_character_pepe/2_walk/W-21.png`)
        this.loadImages(this.IAMGES_WALKING);

        this.animate();
    }

    animate(){

        setInterval(() =>{
            if(this.World.keyboard.RIGHT){
                this.x += this.speed;
                this.otherDirection = false
            }

             if(this.World.keyboard.LEFT){
                this.x -= this.speed;
                this.otherDirection = true
            }
            this.World.camera_x = -this.x

        } ,1000/60)


        setInterval(() => {
            if(this.World.keyboard.RIGHT || this.World.keyboard.LEFT){
            let i = this.currentImage % this.IAMGES_WALKING.length;
            let path = this.IAMGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++
            }
        }, 100)
    
    }

    jump(){


    }
}
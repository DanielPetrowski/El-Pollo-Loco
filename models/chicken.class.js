class Chicken extends MoveableObjects{
     height = 50
     width = 50
    y = 370;

    constructor(){
       
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`)

       this.x = 200 +Math.random()*500;
    }



}
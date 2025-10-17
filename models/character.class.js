class characters extends MoveableObjects{
    height = 280
    y = -100
    speed = 5
    IAMGES_WALKING = [
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png',
        ];

        IAMGES_JUMPING = [
            'img/2_character_pepe/3_jump/J-31.png',
            'img/2_character_pepe/3_jump/J-32.png',
            'img/2_character_pepe/3_jump/J-33.png',
            'img/2_character_pepe/3_jump/J-34.png',
            'img/2_character_pepe/3_jump/J-35.png',
            'img/2_character_pepe/3_jump/J-36.png',
            'img/2_character_pepe/3_jump/J-37.png',
            'img/2_character_pepe/3_jump/J-38.png',
            'img/2_character_pepe/3_jump/J-39.png',
        ];

        IAMGES_DEAD = [
            'img/2_character_pepe/5_dead/D-51.png',
            'img/2_character_pepe/5_dead/D-52.png',
            'img/2_character_pepe/5_dead/D-53.png',
            'img/2_character_pepe/5_dead/D-54.png',
            'img/2_character_pepe/5_dead/D-55.png',
            'img/2_character_pepe/5_dead/D-56.png',
            'img/2_character_pepe/5_dead/D-57.png',
        ];

         IAMGES_Hurt = [
            'img/2_character_pepe/4_hurt/H-41.png',
            'img/2_character_pepe/4_hurt/H-42.png',
            'img/2_character_pepe/4_hurt/H-43.png',
         ]

        World;

    constructor(){
        super().loadImage(`img/2_character_pepe/2_walk/W-21.png`)
        this.loadImages(this.IAMGES_WALKING);
         this.loadImages(this.IAMGES_JUMPING);
         this.loadImages(this.IAMGES_DEAD);
         this.loadImages(this.IAMGES_Hurt);
        this.applyGravaty()
        this.animate();
    }

    animate(){

        setInterval(() =>{
            if(this.World.keyboard.RIGHT && this.x < this.World.level.level_end_x ){
                this.moveRight()
            }

             if(this.World.keyboard.LEFT && this.x > 0){
               this.moveLeft()
            }

            if ( this.World.keyboard.UP && !this.isAboveGround()){
                this.jump();
            }
            this.World.camera_x = -this.x + 100
            

        } ,1000/60)


        setInterval(() => {
            if (this.isDead()){
                this.playAnimation(this.IAMGES_DEAD);
                
            }
            else if( this.isHurt()){
                this.playAnimation(this.IAMGES_Hurt);
            }

            else if(this.isAboveGround()){
                this.playAnimation(this.IAMGES_JUMPING);
            } else{

            if(this.World.keyboard.RIGHT || this.World.keyboard.LEFT){
          

            this.playAnimation(this.IAMGES_WALKING);
            }}
        }, 100)
    
    }

   
}
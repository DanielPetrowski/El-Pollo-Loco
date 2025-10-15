class Endboss extends MoveableObjects{
    height = 300
    width = 300
    y = 145
     

       IAMGES_WALKING = [
            `img/4_enemie_boss_chicken/2_alert/G5.png`,
            `img/4_enemie_boss_chicken/2_alert/G6.png`,
            `img/4_enemie_boss_chicken/2_alert/G7.png`,
            `img/4_enemie_boss_chicken/2_alert/G8.png`,
            `img/4_enemie_boss_chicken/2_alert/G9.png`,
            `img/4_enemie_boss_chicken/2_alert/G10.png`,
            `img/4_enemie_boss_chicken/2_alert/G11.png`,
            `img/4_enemie_boss_chicken/2_alert/G12.png`,
           
        ]

        constructor(){
            super().loadImage(this.IAMGES_WALKING[0]);
             this.loadImages(this.IAMGES_WALKING);

             this.x = 719*4;

             this.animate();
        }

        animate(){
            setInterval(() => {
           this.playAnimation(this.IAMGES_WALKING);
        }, 500)
        }
}
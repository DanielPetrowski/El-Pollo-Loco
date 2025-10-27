class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  offset = {
    top: 120,
    bottom: 80,
    left: 35,
    right: 30,
  };

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.x = 2500;
    this.health = 100; // Startwert
    this.lastHit = 0;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        // Dead-Animation abspielen
        if (this.currentImage < this.IMAGES_DEAD.length) {
          let path = this.IMAGES_DEAD[this.currentImage];
          this.img = this.imageCache[path];
          this.currentImage++;
        } else {
          let lastIndex = this.IMAGES_DEAD.length - 1;
          this.img = this.imageCache[this.IMAGES_DEAD[lastIndex]];
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  // Hurt-Animation starten
  startHurt() {
    this.lastHit = new Date().getTime();
  }

  isHurt() {
    // Nur für Animation, blockiert keine Treffer
    return new Date().getTime() - this.lastHit < 500;
  }

hit() {
  this.health -= 20;
  //voher this.health -=5;
  if (this.health < 0) this.health = 0;
  this.lastHit = new Date().getTime();
  
}



  isDead() {
    return this.health <= 0;
  }
}

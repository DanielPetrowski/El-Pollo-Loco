class Cloud extends MoveableObjects {

    y = 50;
    width = 500;
    height = 250;
    
  constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x
        this.animate();

    }
    
    animate(){
           setInterval(() => {
            this.moveLeft() 
            this.speed = 0.5
            this.otherDirection = false

            if ( this.x + this.width < 0){
                this.x = 4500 + Math.random()* 300
            }
        }, 1000 / 60)
    }

    
}

  
        
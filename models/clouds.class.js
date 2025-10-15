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
        this.moveLeft();
    }

    
}
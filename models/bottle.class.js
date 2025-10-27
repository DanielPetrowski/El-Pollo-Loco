class Bottle extends DrawableObject {
  width = 60;
  height = 90;

  IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
  ];

  offset = {
    top: 14,
    bottom: 10,
    left: 22,
    right: 18,
  };

  visible = true; // Flag, ob die Bottle gezeichnet wird

  constructor() {
    super();
    this.loadImages(this.IMAGES);

    const randomIndex = Math.floor(Math.random() * this.IMAGES.length);
    this.img = this.imageCache[this.IMAGES[randomIndex]];

    this.x = 400 + Math.floor(Math.random() * 10 * 180);
    this.y = 335 + Math.floor(Math.random() * 20);
  }

  collect() {
    // Wird aufgerufen, wenn der Character die Bottle einsammelt
    this.visible = false;

    // Nach 10 Sekunden wieder sichtbar machen
    setTimeout(() => {
      this.visible = true;
      // Optional: wieder ein zufälliges Bild auswählen
      const randomIndex = Math.floor(Math.random() * this.IMAGES.length);
      this.img = this.imageCache[this.IMAGES[randomIndex]];
    }, 10000); // 10000 ms = 10 Sekunden
  }
}

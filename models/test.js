class Character extends MovableObject {
  y = 160;
  height = 250;
  width = 125;
  speed = 10;
  isSleeping = false;

  offset = {
    top: 100,
    right: 15,
    bottom: 10,
    left: 15
  };
  class Chicken extends MovableObject {
  y = 330;
  height = 100;
  energy = 0;

  offset = {
    top: 5,
    right: 0,
    bottom: 10,
    left: 0
  };

  class SmallChicken extends MovableObject {
  y = 370;
  height = 60;
  width = 60;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 15
  };

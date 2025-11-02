class SoundHub {
  isPlaying = true;
  button;
  static instance = null;
  static coinCollectedAudio = new Audio('Audio/CoinCollect.mp3');
  static bottleCollectedAudio = new Audio('Audio/BottleCollect.mp3');
  static jumpAudio = new Audio('Audio/Jump.mp3');
  static runningAudio = new Audio('Audio/Walking.mp3');
  static hitEndbossAudio = new Audio('Audio/EnbossHit.mp3');
  static deadChickenAudio = new Audio('Audio/hitChicken.mp3');
  static deadCharacterAudio = new Audio('Audio/GameOver.mp3');
  static hitCharacterAudio = new Audio('Audio/CharacterHit.mp3');
  static snoringAudio = new Audio('Audio/Snoring.mp3');
  static winAudio = new Audio('Audio/WinSound.mp3');
  static backgroundAudio = new Audio('Audio/BackGround.mp3');

  static allSounds = [
    SoundHub.coinCollectedAudio,
    SoundHub.bottleCollectedAudio,
    SoundHub.jumpAudio,
    SoundHub.runningAudio,
    SoundHub.hitEndbossAudio,
    SoundHub.deadChickenAudio,
    SoundHub.deadCharacterAudio,
    SoundHub.hitCharacterAudio,
    SoundHub.snoringAudio,
    SoundHub.winAudio,
    SoundHub.backgroundAudio
  ];

  constructor() {
    this.loadMuteState();
    SoundHub.instance = this;
  }

  initButton() {
    this.button = document.getElementById('audio_button');
    this.updateButton();
  }

  loadMuteState() {
    let savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      let settings = JSON.parse(savedSettings);
      this.isPlaying = settings.audioEnabled;
    }
  }

  saveMute() {
    let settings = {
      audioEnabled: this.isPlaying
    };
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }

  static playOne(sound) {
    if (SoundHub.instance && !SoundHub.instance.isPlaying) {
      return;
    }
    sound.volume = 0.2;
    sound.currentTime = 0;
    sound.play();
  }

  static pauseAll() {
    SoundHub.allSounds.forEach((sound) => {
      sound.pause();
    });
  }

  static pauseOne(sound) {
    sound.pause();
  }

  toggleAudio() {
    this.isPlaying = !this.isPlaying;
    this.saveMute();
    this.updateButton();
  }

  updateButton() {
    if (this.button) {
      if (this.isPlaying) {
        this.button.style.backgroundColor = '#FFA500';
        this.button.innerHTML = '🔊';
      } else {
        this.button.style.backgroundColor = '#C92A2A';
        this.button.innerHTML = '🔇';
      }
    }
  }
}

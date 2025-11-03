/**
 * The canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The game world instance.
 * @type {World}
 */
let world;

/**
 * The keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Array to store interval IDs for stoppable intervals.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Indicates whether the game is muted.
 * @type {boolean}
 */
let mute = false;


/**
 * The mute button element.
 * @type {HTMLElement}
 */
let btnMute = document.getElementById('btnMute');


 

/**
 * The sound played when the game is won.
 * @type {Audio}
 */
let wonGame_sound = new Audio("audio/WinSound.mp3");

/**
 * The background music for the game.
 * @type {Audio}
 */
let backgroundSound = new Audio("audio/BackGround.mp3");

// Set volume for all sounds
wonGame_sound.volume = 0.3;
backgroundSound.volume = 0.1;

/**
 * The mute icon element.
 * @type {HTMLElement}
 */
const muteIcon = document.getElementById('muteIcon');

/**
 * Initializes the game by setting up the canvas, world, and event bindings.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindBtsPressEvents();
    loadMuteSetting(); 
    playBackgroundSound(); 
}

/**
 * Loads the mute setting from localStorage and updates the mute status.
 */
function loadMuteSetting() {
    const storedMute = localStorage.getItem('mute');
    if (storedMute !== null) {
        mute = storedMute === 'true';
        updateMuteIcon();
        if (mute) {
            backgroundSound.pause();
        }
    }
}

/**
 * Updates the mute icon based on the current mute status.
 */
function updateMuteIcon() {
    muteIcon.src = mute ? 'img/icons/noSound.png' : 'img/icons/activeSound.png';
}

/**
 * Plays the background music in a loop if the game is not muted.
 */
function playBackgroundSound() {
    backgroundSound.loop = true; 
    if (!mute) {
        backgroundSound.play();
    }
}


/**
 * Starts the game by initializing the level and showing the game canvas.
 */
function startGame() {
    initLevel();
    document.getElementById('wonGameScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none'); // Ensure Game Over screen is hidden
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('hud').classList.remove('d-none');
    document.getElementById('canvas').style.display = "block";
    
    init();
}

/**
 * Toggles the mute status and updates the background music and icon.
 */
function toggleMute() {
    mute = !mute;
    if (mute) {
        backgroundSound.pause(); 
    } else {
        backgroundSound.play(); 
    }
    updateMuteIcon();
    localStorage.setItem('mute', mute); 
    btnMute.blur();
}





/**
 * Handles the screen orientation and displays a message if the orientation is not landscape.
 */
window.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("turnPhoneMessage");
    const displayOrientation = () => {
        const screenOrientation = screen.orientation.type;
        output.innerHTML = `The orientation of the screen is: ${screenOrientation}`;
        if (screenOrientation === "landscape-primary") {
            document.getElementById('turnPhoneMessage').style.display = 'none';
        } else if (screenOrientation === "landscape-secondary") {
            document.getElementById('turnPhoneMessage').style.display = 'flex';
            output.innerHTML = "Mmmh... the screen is upside down!";
        } else if (screenOrientation === "portrait-secondary" || screenOrientation === "portrait-primary") {
            document.getElementById('turnPhoneMessage').style.display = 'flex';
            output.innerHTML = "Rotate your device to play!";
        } else if (screenOrientation === undefined) {
            document.getElementById('turnPhoneMessage').style.display = 'flex';
            console.log("The orientation API isn't supported in this browser :(");
        }
    };

    if (screen && screen.orientation !== null) {
        try {
            window.screen.orientation.onchange = displayOrientation;
            displayOrientation();
        }
        catch (e) { output.innerHTML = e.message; }
    }
});

/**
 * Displays the game over screen and stops all intervals.
 */
function gameOver() {
    document.getElementById('gameOverScreen').classList.remove('d-none');
    if (mute == false) {
        world.character.dead_sound.play();
    }
    clearIntervals();
}

/**
 * Displays the "won game" screen and stops all intervals.
 */
function wonGame() {
    world.gameIsOver = true; // 👈 bezieht sich auf dein World-Objekt
    clearIntervals();
    if (!mute) wonGame_sound.play();
    setTimeout(() => {
        document.getElementById('wonGameScreen').classList.remove('d-none');
    }, 1500);
}



/**
 * Clears all intervals stored in the intervalIds array.
 */
function clearIntervals() {
    intervalIds.forEach(clearInterval);
}

/**
 * Sets an interval that can be stopped later and stores its ID.
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Handles keydown events to update the keyboard state.
 */
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
      }
    
});

/**
 * Handles keyup events to update the keyboard state.
 */
document.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
     if (e.keyCode == 68) {
        keyboard.D = false;
      }
    
});

  

/**
 * Binds touch events to the on-screen control buttons.
 */
function bindBtsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
};
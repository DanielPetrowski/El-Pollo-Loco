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
 * Indicates whether the game is in fullscreen mode.
 * @type {boolean}
 */
let fullscreenMode = false;



/**
 * The mute button element.
 * @type {HTMLElement}
 */
let btnMute = document.getElementById('btnMute');

/**
 * The fullscreen button element.
 * @type {HTMLElement}
 */
let btnFullscreen = document.getElementById('btnFullscreen');

/**
 * The sound played when the game is won.
 * @type {Audio}
 */
let wonGame_sound = new Audio('Audio/WinSound.mp3');

/**
 * The background music for the game.
 * @type {Audio}
 */
let backgroundSound = new Audio('Audio/BackGround.mp3');

// Set volume for all sounds
wonGame_sound.volume = 0.6;
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
        if (mute) backgroundSound.pause();
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
    if (!mute && backgroundSound.readyState == 4) backgroundSound.play();
}

function preloadImages(imagePaths, callback) {
    let loadedCount = 0;
    const total = imagePaths.length;

    imagePaths.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === total) callback();
        };
        img.onerror = () => {
            console.error('Fehler beim Laden:', src);
            loadedCount++;
            if (loadedCount === total) callback();
        };
        img.src = src;
    });
}

const imagePaths = [
    // === BACKGROUND AIR ===
    'img/5_background/layers/air.png',

    // === BACKGROUND 3rd LAYER ===
    'img/5_background/layers/3_third_layer/1.png',
    'img/5_background/layers/3_third_layer/2.png',

    // === BACKGROUND 2nd LAYER ===
    'img/5_background/layers/2_second_layer/1.png',
    'img/5_background/layers/2_second_layer/2.png',

    // === BACKGROUND 1st LAYER ===
    'img/5_background/layers/1_first_layer/1.png',
    'img/5_background/layers/1_first_layer/2.png',

    // === CLOUDS ===
    'img/5_background/layers/4_clouds/1.png',
    'img/5_background/layers/4_clouds/2.png',

    // === ENEMIES ===
    'img/2_enemies/chicken/chicken.png',
    'img/2_enemies/chicken_small/chicken_small.png',
    'img/2_enemies/endboss/endboss.png',

    // === ITEMS ===
    'img/6_salsa_bottle/salsa_bottle.png',
    'img/7_statusbars/3_icons/icon_coin.png'
];




/**
 * Starts the game by initializing the level and showing the game canvas.
 */
function startGame() {
    const btn = document.getElementById('startButton');
    btn.disabled = true;          
    btn.innerText = 'Loading…';   

    preloadImages(imagePaths, () => {
        initLevel();
        hideScreens();
        init();
    });
}

/**
 * Hides the game screens that are not needed at the start of the game.
 */
function hideScreens() {
    document.getElementById('wonGameScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('hud').classList.remove('d-none');
    document.getElementById('canvas').style.display = "block";
}

/**
 * Toggles the mute status and updates the background music and icon.
 */
function toggleMute() {
    mute = !mute;
    mute ? backgroundSound.pause() : backgroundSound.play();
    updateMuteIcon();
    localStorage.setItem('mute', mute);
    btnMute.blur();
}

/**
 * Toggles fullscreen mode for the game.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    fullscreenMode ? exitFullscreen() : enterFullscreen(fullscreen);
}

/**
 * Enters fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to display in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();

    toggleFullscreenClasses(true);
    btnFullscreen.blur();
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }

    toggleFullscreenClasses(false);
    btnFullscreen.blur();
}

/**
 * Toggles the fullscreen-related CSS classes on the relevant elements.
 * @param {boolean} enable - Whether to enable or disable fullscreen classes.
 */
function toggleFullscreenClasses(enable) {
    fullscreenMode = enable;
    document.getElementById('canvas').classList.toggle('canvasFullscreen', enable);
    document.getElementById('gameOverScreen').classList.toggle('gameOverScreenFullscreen', enable);
    document.getElementById('wonGameScreen').classList.toggle('youWonScreenFullscreen', enable);
}

/**
 * Handles the screen orientation and displays a message if the orientation is not landscape.
 */
window.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("turnPhoneMessage");
    if (screen && screen.orientation !== null) {
        try {
            window.screen.orientation.onchange = displayOrientation;
            displayOrientation();
        } catch (e) {
            output.innerHTML = e.message;
        }
    }
});

/**
 * Displays the orientation message based on the current screen orientation.
 */
function displayOrientation() {
    const screenOrientation = screen.orientation.type;
    const output = document.getElementById("turnPhoneMessage");
    if (screenOrientation === "landscape-primary") hideOrientationMessage();
    else showOrientationMessage(screenOrientation, output);
}

/**
 * Hides the orientation message element.
 */
function hideOrientationMessage() {
    document.getElementById('turnPhoneMessage').style.display = 'none';
}

function isMobileDevice() {
    return (
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        window.innerWidth <= 1024 // z.B. Smartphones/Tablets
    );
}

/**
 * Zeigt eine Dreh-Nachricht nur auf mobilen Geräten an.
 * @param {string} screenOrientation - z.B. screen.orientation.type
 * @param {HTMLElement} output - Element, in dem die Nachricht angezeigt wird
 */
function showOrientationMessage(screenOrientation, output) {
    const turnPhoneMessage = document.getElementById('turnPhoneMessage');

    if (!isMobileDevice()) {
        // Desktop oder große Displays: Nachricht ausblenden
        turnPhoneMessage.style.display = 'none';
        return;
    }

    // Mobile Geräte: Nachricht anzeigen
    turnPhoneMessage.style.display = 'flex';

    if (screenOrientation === "landscape-secondary") {
        output.innerHTML = "Mmmh... the screen is upside down!";
    } else if (screenOrientation.includes("portrait")) {
        output.innerHTML = "Rotate your device to play!";
    } else {
        console.log("The orientation API isn't supported in this browser :(");
    }
}

/**
 * Displays the game over screen and stops all intervals.
 */
function gameOver() {
    console.log('Game Over triggered.'); // Debugging
    document.getElementById('gameOverScreen').classList.remove('d-none');
    if (!mute && world.character.dead_sound.readyState == 4) world.character.dead_sound.play();
    clearIntervals();
}

function stopAllLoopSounds() {
    if (world.character.walkingPlaying) {
        world.character.walking_sound.pause();
        world.character.walking_sound.currentTime = 0;
        world.character.walkingPlaying = false;
    }
}

/**
 * Displays the "won game" screen and stops all intervals.
 */
function wonGame() {
    clearIntervals();
    stopAllLoopSounds();
    if (!mute && wonGame_sound.readyState == 4) wonGame_sound.play();
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
document.addEventListener('keydown', (e) => handleKeyDown(e));
document.addEventListener('keyup', (e) => handleKeyUp(e));

function handleKeyDown(e) {
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 88) keyboard.X = true;
    if (e.keyCode == 27 && fullscreenMode) exitFullscreen();
}

function handleKeyUp(e) {
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 88) keyboard.X = false;
    if (e.keyCode == 27 && fullscreenMode) exitFullscreen();
}

/**
 * Binds touch events to the on-screen control buttons.
 */
function bindBtsPressEvents() {
    bindButtonEvent('btnLeft', 'LEFT');
    bindButtonEvent('btnRight', 'RIGHT');
    bindButtonEvent('btnJump', 'SPACE');
    bindButtonEvent('btnThrow', 'X');
}

/**
 * Binds touchstart and touchend events to a button for simulating key presses.
 * @param {string} buttonId - The ID of the button element.
 * @param {string} key - The keyboard key associated with the button.
 */
function bindButtonEvent(buttonId, key) {
    document.getElementById(buttonId).addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    document.getElementById(buttonId).addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
}
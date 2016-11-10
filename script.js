/**
 * Created by Ethan on 7/25/2016.
 */

//Canvas variables
let stage, canvas, queue, canvasHeight, canvasWidth;

//Timing variables
let startTime = 0;

//Dot game variables
let dotsClickedTillEnd = 10, dotsClicked = 0;

$(document).ready(function () {
    canvas = $("#mycanvas");
    canvasHeight = canvas.height();
    canvasWidth = canvas.width();
    createjs.Ticker.addEventListener("tick", handleTick);
    stage = new createjs.Stage("mycanvas");
    //    preloadAssets();
    startDotScreen();
});

// function preloadAssets() {
//     var manifest;
//     manifest = [
//         // PREVIOUS
//         {src: "images/window.png", id: "img_win"},
//     ];
// // Start Preload
//     queue = new createjs.LoadQueue();
//     queue.addEventListener("fileload", preloadFileLoaded);
//     queue.addEventListener("complete", preloadCompleted);
//     queue.loadManifest(manifest);
// }
// function preloadFileLoaded(event) {
//     console.log("LOADING PERCENTAGE", queue.progress)
// }
// function preloadCompleted() {
//     createUI();
// }

let handleTick = (event) => {
    // Actions carried out each tick (aka frame)
    if (!event.paused) {
        // Actions carried out when the Ticker is not paused.
    }
};

let eraseElement = (graphic) => {
    graphic.removeAllEventListeners();
    stage.removeChild(graphic);
}

let createUI = () => {
    dotsClickedTillEnd = 10;
    stage.addChild(addCircle());
    stage.update();
};

/**
 * Start screen for the dot game
 */
let startDotScreen = () => {
    let startDotButton = new createjs.Shape();
    startDotButton.graphics.beginFill("black").drawRoundRect(100, 100, 100, 40, 10);
    stage.addChild(startDotButton);
    startDotButton.addEventListener("click", startDotScreenClicked)
    stage.update();
};

let startDotScreenClicked = (event) => {
    eraseElement(event.target);
    createUI();
}

/**
 * Add's a circle to the screen, can put in x and y cords. Returns the circle object
 * to be added
 *
 * @param xCord
 * @param yCord
 * @returns {*|c}
 */
let addCircle = (xCord, yCord) => {
    if (!xCord) {
        xCord = Math.floor((Math.random() * canvasWidth) + 1);
    }
    if (!yCord) {
        yCord = Math.floor((Math.random() * canvasHeight) + 1);
    }
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = xCord;
    circle.y = yCord;
    circle.addEventListener("click", circleClicked);
    startTime = createjs.Ticker.getTime(true);
    stage.update();
    return circle;
}
/**
 *  Event listener when a circle is clicked
 *
 * @param event
 */
let circleClicked = (event) => {
    if(++dotsClicked == 10) {
        eraseElement(event.target);
    }
    console.log((createjs.Ticker.getTime(true) - startTime) / 1000);
    console.log(`Circle has been clicked`);
    event.target.x = Math.floor((Math.random() * canvasWidth) + 1);
    event.target.y = Math.floor((Math.random() * canvasHeight) + 1);
    startTime = createjs.Ticker.getTime(true);
    stage.update();
};
/**
 * Created by Ethan on 7/25/2016.
 */

//Canvas variables
let stage, canvas, canvasHeight, canvasWidth;

//Timing variables
let startTime = 0;

let onStageClickCallback;

//Dot game variables
let numberOfRounds = 10, dotsClicked = 0, dotRound = 1;

$(document).ready(function () {
    canvas = $("#mycanvas");
    canvasHeight = canvas.height();
    canvasWidth = canvas.width();
    createjs.Ticker.addEventListener("tick", handleTick);
    stage = new createjs.Stage("mycanvas");
    //    preloadAssets();
    addStartButton();
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

/**
 * Click handler
 *
 * @param event
 */
let handleTick = (event) => {
    // Actions carried out each tick (aka frame)
    if (!event.paused) {
        // Actions carried out when the Ticker is not paused.
    }
};

/**
 * Erases a graphic by removing its listeners and the graphic itself
 *
 * @param graphic
 */
let eraseElement = (graphic) => {
    graphic.removeAllEventListeners();
    stage.removeChild(graphic);
}

/**
 * Start screen for the dot game
 */
let addStartButton = () => {
    let startDotButton = new createjs.Shape();
    startDotButton.graphics.beginFill("black").drawRoundRect(100, 100, 100, 40, 10);
    stage.addChild(startDotButton);
    startDotButton.addEventListener("click", startGame)
    stage.update();
};

/**
 *StartGame erases the start button handlers, creates the stage click listener and adds a circle.
 *
 * @param event
 */
let startGame = (event) => {
    // Erase event that handles the start click
    eraseElement(event.target);

    // Handle all clicks to find accuracy
    onStageClickCallback = stage.on("stagemousedown", onStageClick);

    stage.addChild(initCircle());
    stage.update();
};

/**
 * When the stage is clicked update dotsClicked
 *
 * @param event
 */
let onStageClick = (event) => {
    dotsClicked++;
};

/**
 * Add's a circle to the screen, can put in x and y cords. Returns the circle object
 * to be added
 *
 * @returns {*|c}
 */
let initCircle = () => {
    xCord = Math.random() * (canvasWidth-50-50) + 50;
    yCord = Math.random() * (canvasHeight-50-50) + 50;

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
    console.log("Number of rounds: " + dotRound);
    console.log("Clicks: " + dotsClicked);

    //When you've finished all rounds
    if(dotRound++ >= numberOfRounds) {
        console.log("Dot accuracy is " + numberOfRounds/dotsClicked);
        //Erase circle event
        eraseElement(event.target);
        resetGame();
    } else {
        console.log((createjs.Ticker.getTime(true) - startTime) / 1000);
        console.log(`Circle has been clicked`);
        event.target.x = Math.random() * (canvasWidth - 50 - 50) + 50;
        event.target.y = Math.random() * (canvasHeight - 50 - 50) + 50;
        startTime = createjs.Ticker.getTime(true);
        stage.update();
    }
};

/**
 * Resets the dot game, starts over again
 *
 */
let resetGame = () => {
    //Erase stage event
    stage.off("stagemousedown", onStageClickCallback);
    dotRound = 1;
    dotsClicked = 0;
    saveScore();
    addStartButton();
};

let saveScore = () => {
  $.ajax({
      type: "POST",
      url: '/api/saveDotGame',
      data: 'json',
      success: function(data) {
          console.log('save success');
          console.log(data);
      },
      error: function() {
          console.log('save failure')
      }
  })
};
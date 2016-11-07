/**
 * Created by Ethan on 7/25/2016.
 */

let stage, canvas, queue, canvasHeight, canvasWidth;

$(document).ready(function () {
    canvas = $("#mycanvas");
    canvasHeight = canvas.height();
    canvasWidth = canvas.width();

    stage = new createjs.Stage("mycanvas");
    //    preloadAssets();
    createUI();
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

    let createUI = () => {
        stage.addChild(addCircle());
        stage.update();
    };

    let addCircle = (xCord, yCord) => {
        if(!xCord) {
            xCord = Math.floor((Math.random() * canvasWidth) + 1);
        }
        if(!yCord) {
            yCord = Math.floor((Math.random() * canvasHeight) + 1);
        }
        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = xCord;
        circle.y = yCord;
        circle.addEventListener("click", circleClicked);
        stage.update();
        return circle;
    }

    let circleClicked = (event) => {
        console.log(`Circle has been clicked`);
        event.target.x = Math.floor((Math.random() * canvasWidth) + 1);
        event.target.y = Math.floor((Math.random() * canvasHeight) + 1);
        stage.update();
    };
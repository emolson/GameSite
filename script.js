/**
 * Created by Ethan on 7/25/2016.
 */
var stage, canvas, queue;
function init() {
    canvas = document.getElementById("mycanvas");
    stage = new createjs.Stage(canvas);
    preloadAssets();
}
function preloadAssets() {
    manifest = [
        {src:"images/window.png", id:"img_win"},
        {src:"images/sun.png", id:"img_sun"}
    ];
// Start Preload
    queue = new createjs.LoadQueue();
    queue.addEventListener("fileload", preloadFileLoaded);
    queue.addEventListener("complete", preloadCompleted);
    queue.loadManifest(manifest);
}

function preloadFileLoaded(event) {
    console.log ("LOADING PERCENTAGE", queue.progress)
}
function preloadCompleted() {
    createUI();
}

function createUI() {
    // SUN
    var thesun = new createjs.Bitmap(queue.getResult("img_sun"));
    thesun.x = 100;
    thesun.y = 40;
    stage.addChild(thesun);

    // WINDOW
    var win = new createjs.Bitmap(queue.getResult("img_win"));
    win.x = 70;
    win.y = 0;
    stage.addChild(win);
    stage.update()
}
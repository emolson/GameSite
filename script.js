/**
 * Created by Ethan on 7/25/2016.
 */
var stage, canvas, queue;
function init() {
    canvas = document.getElementById("mycanvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    preloadAssets();
}
function preloadAssets() {
    manifest = [
        // PREVIOUS
        {src: "images/window.png", id: "img_win"},
        {src: "images/sun.png", id: "img_sun"},
        // NEW ASSETS
        {src: "images/head_man.png", id: "img_head"},
        {src: "images/body_man.png", id: "img_body"},
        {src: "images/desk.png", id: "img_desk"}
    ];
// Start Preload
    queue = new createjs.LoadQueue();
    queue.addEventListener("fileload", preloadFileLoaded);
    queue.addEventListener("complete", preloadCompleted);
    queue.loadManifest(manifest);
}

function preloadFileLoaded(event) {
    console.log("LOADING PERCENTAGE", queue.progress)
}
function preloadCompleted() {
    createUI();
}

function createUI() {
    // Main Container (added to stage)
    group = new createjs.Container();
    stage.addChild(group)
    // SUN
    var thesun = new createjs.Bitmap(queue.getResult("img_sun"));
    thesun.x = 100;
    thesun.y = 40;
    group.addChild(thesun);
    thesun.cursor = "pointer";
    thesun.addEventListener("click", function (event) {
        event.target.alpha = 0.5;
        stage.update();
    });
    // WINDOW
    var win = new createjs.Bitmap(queue.getResult("img_win"));
    win.x = 70;
    win.y = 0;
    group.addChild(win);
    // BODY
    var body = new createjs.Bitmap(queue.getResult("img_body"));
    body.x = 170;
    body.y = 70;
    group.addChild(body);
    // HEAD
    var head = new createjs.Bitmap(queue.getResult("img_head"));
    head.x = 232;
    head.y = 15;
    group.addChild(head);
    // DESK
    var desk = new createjs.Bitmap(queue.getResult("img_desk"));
    desk.x = 10;
    desk.y = 100;
    group.addChild(desk);
    // SET CONTAINER POSITION
    updatePos();
}

function updatePos() {
    group.x = canvas.width / 2;
    group.y = 0;

    stage.update();
}
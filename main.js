status = "";
objects = [];

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,400);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects:";
}

function draw(){
    image(video,0,0, 600,400);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255)
        objectDetector.detect(video, gotResult);
        for(i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("numbers").innerHTML = "Number Of Objects Detected: " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y-12);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded !");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
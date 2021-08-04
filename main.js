song_1="";
song_3="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
keypoint=0;
keypointY=0;
function preload(){
    song_1=loadSound("music.mp3");
    song_3=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.position(430,260);
    video=createCapture(300,400);
    video.hide()
    pose=ml5.poseNet(video,modelLoaded);
    pose.on('pose',gotposes)
} 
function modelLoaded(){
    console.log("pose net is installed")
}
function draw(){
    image(video,0,0)
    if(keypointY > 0.2){
        fill("red");
        stroke("blue");
        circle(rightWristX,rightWristY,25);
        rightWristYnum=Number(rightWristY);
        rightWristYfloor=floor(rightWristYnum);
        song_1.stop();
        song_3.play();
    }
    if(keypoint > 0.2)
    {fill("red");
    stroke("blue");
    circle(leftWristX,leftWristY,25);
    leftWristYnum=Number(leftWristY);
    leftWristYfloor=floor(leftWristYnum);
    song_1.play();
    song_3.stop();}
    }
function play1(){
    song_1.play()
}
function play3(){
    song_3.play()
}
function stop1(){
    song_1.stop()
}
function stop3(){
    song_3.stop()
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        keypoint=results[0].pose.keypoints[9].score;
        keypointY=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Left wrist X = "+leftWristX , "Left wrist Y = "+leftWristY);
        console.log("right wrist X = "+rightWristX , "Right wrist Y = "+rightWristY);
    }
}
// Empty array userClickedPattern  //
var userClickedPattern = []

// Empty array gamePattern //
var gamePattern = [];

// Array with colors //
var buttonColours = ["red", "blue", "green", "yellow"];

// Level of the game //
var level = 0;

// Detec User Keypress //
$(document).keypress(function(event){
    if (event.key === "a"){
        $("h1").text("Level"+" "+level);
        nextSequence();
    }else{
        console.log(event.key);
    }
})

// Detec User Mouse Click //
$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatedPress(userChosenColour)
    playSound(userChosenColour)
    
    checkAnswer(userClickedPattern.length-1);

})

// Function use to create a random number from 0-3 //
function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("h1").text("Level"+" "+level);
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern)
    // Used to make buttons flash //
    $(".btn"+"."+randomChosenColour).css({opacity: 0});
    $(".btn"+"."+randomChosenColour).animate({opacity: 1}, 700 );
}

function animatedPress(currentColour){
    $(".btn"+"."+currentColour).addClass("pressed");
    setTimeout(function(){
        $(".btn"+"."+currentColour).removeClass("pressed")}, 100);
}



function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
  }

// Function use to compare userPattern with gamePattern //
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("Success!");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }

    }else{
        console.log("wrong!")
        playSound("wrong")
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over")}, 100);
        startOver()
    }
}

function startOver(){
    userClickedPattern = []
    gamePattern = [];
    level = 0;
}




let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

//Detect when buttons are clicked
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");

  //Add Contents of userChosenColour to userClickedPattern array
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  //Check the users' answer
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
  } else {
    console.log("Wrong!");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press Any Key to Restart");

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  //Increase level and change h1 everytime nextSequence is run
  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Creating animation for randomChosenColour button
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  //Playing audio for buttons
  playSound(randomChosenColour);

}

function playSound(name) {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function() {
    $(`#${currentColour}`).removeClass("pressed");
  }, 200)
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}

var sequence = [];
var gameState = "Not started";
var clickCount = 0;

function getRandomSequenceStep() {
    return Math.floor(Math.random() * 4);
}

$("[type='button']").click(function () {
    clickHandler(this.id);
});

document.addEventListener("keydown", function (e) {
    if (e.key == "a" && gameState == "Not started" || gameState == "Game over") {
        newSequenceStep();
        gameState = "Game started";
    }
});

function clickHandler(color) {
    $("#" + color).addClass("game-over");
    setTimeout(function () {
        $("#" + color).removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    if (gameState == "Game started") {
        correctClickValidator(color);
    }
}

function correctClickValidator(color) {
    if (color !== numberColorMapper(sequence[clickCount])) {
        clickCount = 0;
        gameOver();
        return;
    } else if (clickCount === sequence.length - 1) {
        clickCount = 0;
        setTimeout(function () {
            newSequenceStep();
        }, 1000);
        return;
    }
    clickCount++;
}

function newSequenceStep() {
    sequence.push(getRandomSequenceStep());
    $("h1").text("Level " + sequence.length);
    showNewSequenceToPlayer();
}

function showNewSequenceToPlayer() {
    color = numberColorMapper(sequence[sequence.length - 1]);
    $("#" + color).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    sequence = [];
    gameState = "Game over";
}

function numberColorMapper(number) {
    switch (number) {
        case 0:
            return "green";
        case 1:
            return "red";
        case 2:
            return "yellow";
        case 3:
            return "blue";
    }
}
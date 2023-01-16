import '../src/css/style.css'

//business logic
function getAPIData(response) {
  //generate prompts?
  //
}
//function determine an end of game???? How long it is? 
  //how many calls we make in total that determines a length of the game?


// function that initial prompt sender
    //*prompt writer => game design area
    // determines the theme
    // defines the rules of the game, the limitations
    //defines user input? (1,2,3) How many choices can the player make?


//UI logic 

function startGame(){
 let startBox = document.getElementById("startBox");
 startBox.classList.add("hidden");
 let gameBox = document.getElementById("gameBox");
 gameBox.classList.remove("hidden");
}

document.getElementById("startButton").addEventListener('click', startGame);

//function that print responses
function printElements() {
  //print ai completions?
  document.getElementById("aiInput").innerText = output;
}

function printError() {
  
}
//function that display images







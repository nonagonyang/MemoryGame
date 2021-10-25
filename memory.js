const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);


    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    
  }
}

// set the clickCounter to zero
let clickCounter=0;
// declare an array to contain revealed colors to allow comparision after two clicks
let revealedColor=[];
// declare a variable to record how many clicks the user spent to win the game
let guessedNumber=0;

// this function handles what happen to a card when gets clicked 
function handleCardClick(event) {
  //add one for each click
  guessedNumber=guessedNumber+1;

  //add one for each click, but will reset according to conditions
  clickCounter=clickCounter+1;
  
  // if a card gets clicked, this function reveals its background color
  // the card gets new attribute "clicked" to help count and track which card is clicked
  const backgroundColor= event.target.getAttribute("class");
  event.target.style.backgroundColor= backgroundColor;
  event.target.classList.add("clicked");
  revealedColor.push(event.target.style.backgroundColor);

  
  //when clicked twice, compare if the revealed colors are the same
  //if color is same and the cards are different, the cards remain revealed
  //if different, the cards should conceal the color

  if(clickCounter>=2){
    const clicked =document.querySelectorAll(".clicked");
    //if only one element has the class of "clicked", it means the user clicked the same card twice or more
    if(clicked.length===1){
      clickCounter=1;
      revealedColor=revealedColor[0];
    }
// when the user clicked twice and the two cards have the same color
    if(clicked.length===2 && revealedColor[0]===revealedColor[1]){
      for(card of clicked){
        card.classList.add("matched");
        card.classList.remove("clicked");
        clickCounter=0;
        revealedColor=[];
      }
    }  
    else{setTimeout(
      function(){
      for(card of clicked){
        card.style.backgroundColor="white";
        card.classList.remove("clicked");
        clickCounter=0;
        revealedColor=[];
      }
    },  
    1000)}
  }
  saveLowestToLocalStorage(guessedNumber);
}

//save the lowerst guessedNumber to localstorage 

function saveLowestToLocalStorage(num){
  let lowest = localStorage.getItem("lowest");
  if(lowest){
    //update lowest if the newly guessednumber is smaller
    if (guessedNumber < parseInt(lowest)) {
        localStorage.setItem("lowest", "guessedNumber");  
        return lowest;    
    }

  }
  else{
    localStorage.setItem("lowest", "guessedNumber");
    return lowest;
  }
  
}


//check if someone wins the game and tell user how many times of clicks they spent to win, when they match all the cards.
    function announceWin(){
      let matched=document.querySelectorAll(".matched")
      if (matched.length===COLORS.length){
      alert(`You finished the game and you guessed ${guessedNumber} times, 
      the best record is ${saveLowestToLocalStorage(guessedNumber)}`)
      }
    }
    


//add id attribute to card, so one card clicked twice is not a match
// const cards=document.querySelectorAll("div");
// for(let i=1;i<cards.length;i++){
//   cards[i].setAttribute("id",i)
// }

//Add a button that when clicked will start the game
const startBnt=document.querySelector("#start");
startBnt.addEventListener("click",function(){createDivsForColors(shuffledColors)})

//Add a button that when clicked check if someone has won the game

const doneBnt=document.getElementById("done");
doneBnt.addEventListener("click", function(){
  announceWin();
})


//Add a button that when clicked will restart the game
const restartBtn=document.querySelector("#reStart");
restartBtn.addEventListener("click",function(){
  window.location.reload();
})





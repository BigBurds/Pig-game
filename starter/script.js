'use strict';

//SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //.TOGGLE WILL ADD OR REMOVE THE CLASS IF IT DOES OR DOSENT CONTAIN IT
  player1El.classList.toggle('player--active');
};
let scores, currentScore, activePlayer, playing;
//STARTING CONDITIONS

//Reset function
const init = function(){
scores = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;

diceEL.classList.add('hidden');
player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
console.log(score0El.textContent);
console.log(score1El.textContent);
}
//Creating a state variable so that none of the playing functions work if false is false
init()

//ROLLING DICE FUNCTION
btnRoll.addEventListener('click', function () {
  if (playing) {
    //HENERATE A RANDOM DICE ROLL
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //DISPLAY A DICE IMG
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${diceRoll}.png`;

    //CHECK FOR ROLLED 1, IF TRUE SWITCH TO NECT PLAYER
    if (diceRoll !== 1) {
      //ADD DICE TO CURRENT DICE
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore;  //CHANGE LATER
    } else {
      //SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //  ADD CURRENT SCORE TO ACTIVE PLAYERS SCORE
    scores[activePlayer] += currentScore;

    //score[1] = score[1] + currentScore;  //same as above but not dynamic
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // CHECK IF PLAYER SCORE IS >= 100
    if (scores[activePlayer] >= 100) {
      // FINISH THE GAME - turning the state variable to false
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      //SWITCH TO THE NEXT PLAYER
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
    init()
});

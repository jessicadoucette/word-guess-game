// variables
var words = [
	"ruth bader ginsburg",
	"gloria steinem",
	"maya angelou",
	"hillary clinton",
	"malala yousafzai",
	"beyonce",
	"sojourner truth",
	"susan anthony",
	"ellen degeneres"
];

var wins = 0;
var losses = 0; 
var guessesLeft = 10;
var gameRunning = false;
var pickedWord = ''; 
var wordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];


// Grab stuff
var $newGameButton = document.getElementById('new-game-button'); 
var $placeHolder = document.getElementById('place-holder');
var $guessedLetter = document.getElementById('guessed-letters'); 
var $guessesLeft = document.getElementById('guesses-left');
var $winCount = document.getElementById('win-count');


function newGame () {
	//reset all game info
	gameRunning = true; 
	guessesLeft = 10;
	guessedLetterBank = [];
	incorrectLetterBank = []; 
	wordPlaceholderArr = [];

	//pick new word
	pickedWord = words[Math.floor(Math.random() * words.length)]; 

	//create placeholder out of new words 49:04
	for (var i = 0; i < pickedWord.length; i++) {
		if (pickedWord[i] === ' ') {
			wordPlaceholderArr.push('  ');
		}
		else {
			wordPlaceholderArr.push('_');
			}
		}
	
	//write info to DOM
	$guessesLeft.textContent = guessesLeft; 
	$placeHolder.textContent = wordPlaceholderArr.join('');
	$guessedLetter.textContent = incorrectLetterBank;
	}

	//letterGuess function - is the selected letter in the selected word? 
	function letterGuess(letter) {
		console.log(letter); 

		if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
			guessedLetterBank.push(letter); 

			for (var i = 0; i < pickedWord.length; i++) {
				if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {

					wordPlaceholderArr[i] = pickedWord[i]; 
				
				}
					
				}
		
		$placeHolder.textContent = wordPlaceholderArr.join('');
		checkIncorrect(letter); 
		checkWin();
			}

		else {
			if (gameRunning === false) {
				alert("The game isn't running! Click on the new game button to start over"); 
			} else {
				alert("You've already guessed this letter, pick a new one"); 
			}
		}
		}

	//add function for checkIncorrect letter
	function checkIncorrect(letter) {
		//check to see if letter did not make it into wordPlaceholder; show incorrect guess
		if (
			wordPlaceholderArr.indexOf(letter.toLowerCase()) === -1
		) {
		//decrement guesses
		guessesLeft--;
		//add incorrect letter to incorrectLetterBank
		incorrectLetterBank.push(letter); 
		//write new bank of incorrect letters guessed to DOM
		$guessedLetter.textContent = incorrectLetterBank.join(' '); 
		//write new amount of guesses left to DOM
		$guessesLeft.textContent = guessesLeft; 
		}
		checkLoss();
	}

	function checkLoss() {
		if (guessesLeft === 0) {
			losses++; 
			gameRunning = false;
		}
		checkWin();
	}



	function checkWin() {
		if (pickedWord.toLowerCase() === wordPlaceholderArr.join('').toLowerCase())
		{
			wins++; 
			gameRunning = false;
			$winCount.textContent = wins;  
		}
		else {
			if (guessesLeft === 0) {
				console.log("you lose");
				alert("out of guesses");
				newGame();
			}
		}
	}
	
	


	//event listener for new game button 51.32
	$newGameButton.addEventListener('click', newGame); 

	// add onkeyup event!
	document.onkeyup = function(event) {
		console.dir(event);
		if (event.keyCode >=65 && event.keyCode <=90) {
			letterGuess(event.key);
		}
			
		}

		
	
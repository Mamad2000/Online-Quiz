
var points = 0;
var question = document.querySelector(".initial-par")
var question1El= document.querySelector('#question01-label');
var question2El= document.querySelector('#question02-label');
var question3El= document.querySelector('#question03-label');
var question4El= document.querySelector('#question04-label');
var titleEl= document.querySelector('title');
var allQuestionsEl= document.querySelector('.all-questions');
var nextbuttonEl= document.querySelector('#startBtn');
var anyBtn = document.querySelectorAll("button");
var seconds = 30;
var signUpButton = document.querySelector("#sign-up");
var emailInput = document.querySelector("#email");
var passwordInput = document.querySelector("#password");
var msgDiv = document.querySelector("#msg");
var initialForm = document.querySelector(".clearfix");

// This class is in HTML
var timeEl = document.querySelector(".time");
var wrong = document.createElement("li");
var i = 0;
var questions = [{question: "Commonly used data types DO NOT INCLUDE:",
					choice01: "booleans",
					choice02: "alerts",
					choice03: "strings",
					choice04: "numbers",
					correct: "alerts",},

					{question: "Arrays in javascript can be used to store ____",
					choice01: "Numbers and strings",
					choice02: "Other arrays",
					choice03: "Bolleans",
					choice04: "All of the above",
					correct: "All of the above",},

					{question: "String values must be enclosed within ___ when being assigned to variables ",
					choice01: "Commas",
					choice02: "Curly Brackets",
					choice03: "Quotes",
					choice04: "Parantheses",
					correct: "Quotes",},

					{question: "A very usefull tool used during development and debugging for printing content to the debugger is:",
					choice01: "Javascript",
					choice02: "Terminal/Bash",
					choice03: "For loops",
					choice04: "Console Log",
					correct: "Console Log",}];


console.log(anyBtn);
console.log(allQuestionsEl)


function setTime() {
	// Sets interval in variable
	var timerInterval = setInterval(function() {
		seconds--;
		
		timeEl.setAttribute('style', "background: red; text-align:center; border-radius: 20px; width: 50%; justify-content: center");

		// Secondleft will go down as we increment
		timeEl.textContent = seconds + " seconds left";
		//If we remove this, it will reduce the time forever
		if(seconds === 0 || seconds < 0) {
			// IMPORTANT:
			// Stops execution of action at set interval
			clearInterval(timerInterval);
			// Calls function to display the points
			seconds = 30;
			initialForm.style.display = "";
			displayPoints(points);


		}
	//This is the timing interval between each second, here's 1000miliseconds = 1 second
	// Basically after every 1000 milisecond it will run the first argument(which is a whole ass function)
	}, 1000);
};

// This function will change the question text upon clicking the answers
function displayQuestions() {

		question.textContent = questions[i].question;
		question1El.textContent = questions[i].choice01;
		question2El.textContent = questions[i].choice02;
		question3El.textContent = questions[i].choice03;
		question4El.textContent = questions[i].choice04;

}

// This function will check whether the answer is correct
function checkAnswer(event) {
	var clicked = event.target;
	console.log("sth was clicked")
	if (clicked.matches("button")) {
		console.log("a button was clicked");
		if (clicked.textContent === questions[i].correct) {
			console.log("correct answer");
			points++;
		} else {
			console.log("wrong answer");
			// display a msg saying it was wrong and that you got penalised 5 seconds
			// TODO: NOT WORKING!
			// wrong.textContent = "Wrong Answer! You got penalised 5 Seconds 🥲"
			// body.appendChild(wrong);
			// wrong.setAttribute("style", "font-size:25px; text-align:center; color:white");
			window.alert("Wrong Answer! You got penalised 5 Seconds 🥲")
			seconds = seconds - 5;
		}
		if (i === 3) {
			displayPoints(points);
		}

		i++;
		displayQuestions();

	}
	
}
		



function displayPoints(points) {
	question.textContent = "Your points: " + points;
	allQuestionsEl.style.display = "none";
	titleEl.style.display = "none";
	timeEl.style.display = "none";
	nextbuttonEl.style.display = "";
	i = 0;
	// create a query element that will contain a submit box that we can fill out with our initials 
	showInitials();

}

//if the user clicks on the start button a timer 
// will be displayed on the screen. Then the question
// textContent will be changed
nextbuttonEl.addEventListener ("click", function() {
	initialForm.style.display = "none";

	allQuestionsEl.style.display = "";
	// var i = 0;
	setTime();
	displayQuestions();
	nextbuttonEl.style.display = "none";
});

allQuestionsEl.addEventListener("click", checkAnswer);

signUpButton.addEventListener("click", function(event) {
	event.preventDefault();
	
	var email = document.querySelector("#email").value;
	var password = document.querySelector("#password").value;
	
	if (email === "") {
		displayMessage("error", "Email cannot be blank");
	} else if (password === "") {
		displayMessage("error", "Password cannot be blank");
	} else {
		displayMessage("success", "Registered successfully");
	
	// TODO: Save email and password to localStorage and render the last registered user
	// LOOK AT LINES 35 ADN 36
	localStorage.setItem("last-email", email);
	localStorage.setItem("last-pwd", password);
	// We will run the function when it has been clicked
	renderLastRegistered();
	
	}
});	  



function renderLastRegistered() {
	// TODO: Retrieve the last email and password and render it to the page
	var lastEmail = localStorage.getItem("last-email");
	var lastPwd = localStorage.getItem("last-pwd");
	// if email is not empty then store the text content of the last email itno lastEmail
	if (lastEmail) {
	  // IMPORTANT:
	  // Store it into the variable and then display it
	  userEmailSpan.textContent = lastEmail;
	}
	if (lastPwd) {
	  userPasswordSpan.textContent = lastPwd;
	}
  
  
}
function displayMessage(type, message) {
msgDiv.textContent = message;
msgDiv.setAttribute("class", type);
}
  
function init () {
	allQuestionsEl.style.display = "none";
	initialForm.style.display = "none";


}
init();


var game = {
	//index of current question in questions array
	currentQuestionIndex: 0,
	corrects: 0,
	wrongs: 0,
	currentTimeout: 0,
	timeLeft: 10,

	questions: [
		{
			question: "Which country has the largest landarea?",
			answers: ["United States of America", "Canada", "China", "India"], answerIndex: 1
		},
		{
			question: "Which country has the largest population",
			answers: ["Nigeria", "Russia", "United States of America", "India"], answerIndex: 3
		},
		{
			question: "Which country is the most northern?",
			answers: ["Croatia", "Albania", "Macedonia", "Greece"], answerIndex: 0
		},
		{
			question: "Which country is the most southern?",
			answers: ["Croatia", "Albania", "Greece", "Macedonia"], answerIndex: 2
		},
		{
			question: "Which is NOT a territory of the United States?",
			answers: ["Florida", "Puerto Rico", "Wake Island", "Panama Canal"], answerIndex: 3
		},
		{
			question: "Which is a territory of the United Kingdom?",
			answers: ["St. Helena", "Canada", "Brunei", "Solomon Islands"], answerIndex: 0
		},
		{
			question: "What is the tallest mountain in the contiguous 48 states?",
			answers: ["Denali", "Mount Whitney", "Mount St. Helens", "Mount Massive"], answerIndex: 1
		},
		{
			question: "Which portugese speaking country has the highest GDP?",
			answers: ["Portugal", "Brazil", "Angola", "Mozambique"], answerIndex: 1
		},
		{
			question: "Which country has the lowest population?",
			answers: ["Canada", "Australia", "Spain", "Nigeria"], answerIndex: 1
		},
		{
			question: "Which country does the equator cross?",
			answers: ["Malaysia", "Rwanda", "Peru", "Indonesia"], answerIndex: 3
		},
	],

	intializeGame: function () {
		this.currentQuestionIndex = 0;
		this.corrects = 0;
		this.wrongs = 0;

		this.askQuestion(this.currentQuestionIndex);
	},

	askQuestion: function (questionIndex) {

		console.log(this);
		$("#trivia-question").text(this.questions[questionIndex].question);

		//clear out answers container of whatever answers were there previously and store it to add answers in forreach loop
		var answerContainer = $("#trivia-answers-container").html("");
		var answers = [];

		for (var i = 0; i < this.questions[questionIndex].answers.length; i++) {
			answers.push(this.constructAnswerDiv(this.questions[questionIndex].answers[i], i));
		}

		while (answers.length > 0) {
			var randomAnswer = Math.floor(Math.random() * answers.length);
			answerContainer.append(answers[randomAnswer]);
			answers.splice(randomAnswer, 1);
		}

		this.timeLeft = 10;
		this.timeRemainingUpdate(this.timeLeft);

		this.timeoutFunction();
	},

	timeoutFunction: function () {
		if (game.timeLeft > 0) {
			game.timeLeft--;
			game.currentTimeout = setTimeout(game.timeoutFunction, 1000);
			game.timeRemainingUpdate(game.timeLeft + 1);
		} else {
			game.answerQuestion(-1);
		}
	},

	timeRemainingUpdate: function (secs) {
		$("#time-remaining").html("There are <strong>" + secs + "</strong> seconds remaining!");
	},

	constructAnswerDiv: function (answer, index) {
		var answerDiv = $("<div>").attr("class", "trivia-answer").attr("data-index", index).text(answer)

		//TODO: add listener for click on answerDiv
		answerDiv.on("click", function (event) {
			game.answerQuestion(parseInt(this.getAttribute("data-index")));
		});

		return answerDiv
	},

	answerQuestion: function (answerIndex) {
		clearTimeout(this.currentTimeout);

		//if correct
		if (answerIndex === this.questions[this.currentQuestionIndex].answerIndex) {
			this.corrects++;
			$("#trivia-question").html("Wowwee good job!<br>Get ready for another!");
		} else {
			this.wrongs++;
			if (answerIndex === -1) {
				$("#trivia-question").html("Outta Time!<br>Get ready for another!");
			} else {
				$("#trivia-question").html("WRONG<br>Get ready for another!");
			}
		}

		this.nextQuestion();
	},

	nextQuestion: function () {
		this.currentQuestionIndex++;
		clearTimeout(this.currentTimeout);

		if (this.currentQuestionIndex < this.questions.length) {
			setTimeout(function () {
				game.askQuestion(game.currentQuestionIndex);
			}, 3000);

			this.showCurrentStats();
		} else {
			this.showResults();
		}

	},

	showCurrentStats: function () {
		$("#time-remaining").html("")
		$("#trivia-answers-container").html("Correct: " + this.corrects + "<br>" +
			"Wrong: " + this.wrongs);
	},

	showResults: function () {
		$("#trivia-question").html("WOW that was fast<br>Let's see how ya did!");
		$("#time-remaining").html("")
		$("#trivia-answers-container").html("Correct: " + this.corrects + "<br>" +
			"Wrong: " + this.wrongs);
		$("#trivia-answers-container").append("<br>WOW " + (this.corrects * 10) + "%!")

		//adds a reset button
		$("<button>").text("Reset").appendTo("#trivia-container").on("click", function (event) {
			this.remove();
			game.intializeGame();
		});
	},
}

$(document).ready(function () {
	$("#start-button").on("click", function (event) {
		this.remove();
		game.intializeGame();
	});
});
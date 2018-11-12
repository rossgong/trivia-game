

var game = {
	//index of current question in questions array
	currentQuestionIndex: 0,
	corrects: 0,
	wrongs: 0,
	currentTimeout: 0,

	questions: [
		{question: "What is 2+1?", answers: ["1","2","3","4"], answerIndex: 2},
		{question: "What is 1+3?", answers: ["1","2","3","4"], answerIndex: 3},
		{question: "What is 1+1?", answers: ["1","2","3","4"], answerIndex: 1},
		{question: "What is 2+2?", answers: ["1","2","3","4"], answerIndex: 3},
	],



	intializeGame: function() {
		this.currentQuestionIndex = 0;
		this.corrects = 0;
		this.wrongs = 0;

		this.askQuestion(this.currentQuestionIndex);
	},

	askQuestion: function(questionIndex) {

		console.log(this);
		$("#trivia-question").text(this.questions[questionIndex].question);

		//clear out answers container of whatever answers were there previously and store it to add answers in forreach loop
		var answerContainer = $("#trivia-answers-container").html("");
		for (var i = 0; i < this.questions[questionIndex].answers.length; i ++) {
			answerContainer.append(this.constructAnswerDiv(this.questions[questionIndex].answers[i], i));
		}

		this.currentTimeout = setTimeout(function() {
			game.answerQuestion(-1);
		}, 3000);
	},

	constructAnswerDiv: function(answer, index) {
		var answerDiv = $("<div>").attr("class", "trivia-answer").attr("value", index).text(answer)

		//TODO: add listener for click on answerDiv
		answerDiv.on("click", function(event) {
			game.answerQuestion(parseInt(this.getAttribute("value")));
		});

		return answerDiv
	},

	answerQuestion: function (answerIndex) {
		clearTimeout(this.currentTimeout);

		//if correct
		if (answerIndex === this.questions[this.currentQuestionIndex].answerIndex) {
			this.corrects++;
		} else {
			this.wrongs++;
		}

		console.log("w:" + this.corrects + "||l:" + this.wrongs);

		this.nextQuestion();
	},

	nextQuestion: function() {
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

	showCurrentStats: function() {
		$("#trivia-question").html("CURRENT STATS");
		$("#trivia-answers-container").html("Correct: " + this.corrects + "<br>" +
		"Wrong: " + this.wrongs);
	},

	showResults: function () {
		this.showCurrentStats();

		//adds a reset button
		$("<button>").text("Reset").appendTo("#trivia-container").on("click", function(event) {
			this.remove();
			game.intializeGame();
		});
	},
}

$(document).ready( function() {
	$("#start-button").on("click", function(event) {
		this.remove();
		game.intializeGame();
	});
	
});
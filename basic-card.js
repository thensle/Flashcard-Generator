var inquirer = require("inquirer");
var card = {
	cardQuestions: [],
	cardAnswers: [],
};
var count = 0;

function BasicCard (front, back){
	this.question = front;
	this.answer = back;
};

//Start Commandline Prompt
startMenu();

function startMenu(){
	inquirer.prompt([{
		name: "command",
		type: "list",
		message: "\n\n\nWelcome to FlashCard Generator! \n\nWhat would you like to do?",
		choices: ["Make Card(s)", "Review/Quiz Yourself with Your Card", "Delete Your Cards"]
	}]).then(function(task){
		console.log(task.command);
		if(task.command === "Delete Your Cards"){
			deleteCards();
		} else if(task.command === "Make Card(s)"){
			makeCards();
		} else{
			reviewCards();
		};
	});

};

function makeCards(){
	inquirer.prompt([{
		name: "question",
		type: "input",
		message: "Type your question on your card here:"
	},
	{
		name: "answer",
		type: "input",
		message: "Type the answer to your previous question on your card here:"
	},
	{
		name: "command",
		type: "list",
		message: "What would you like to do now?",
		choices: ["Save Card and Make Another Card", "Save Card and Review Cards", "Delete this Card"]
	}]).then(function(data){
			var question = data.question.trim();
			var answer = data.answer.trim();
			
			if (data.command === "Delete this Card"){
				startMenu();
			} else {
				var basicCard = new BasicCard(question, answer);
				card.cardQuestions.push(basicCard.question);
				card.cardAnswers.push(basicCard.answer);

				console.log(card.cardQuestions);
				console.log(card.cardAnswers);

				if(data.command === "Save Card and Make Another Card"){
					makeCards();
				} else {
					reviewCards();
				};
			};
		});
};

function reviewCards(){
	if (card.cardQuestions.length === 0){
		console.log("\n\nYou don't have any saved flashcards! Try creating some!");
		startMenu();
	} else {
		for(var i = 0; i < card.cardQuestions.length; i++){
			var question = card.cardQuestions[i];
			var answer = card.cardAnswers[i].toLowerCase().trim();

			console.log("\n\n" + question + "\n\n");
			count = 0;

			promptAnswer(count, question, answer);
		};
	};
};

function deleteCards(){
	inquirer.prompt([{
		name: "delete",
		type: "confirm",
		message: "Are you sure you want to delete ALL your cards?"
	}]).then(function(task){
		if(task.delete === true){
			card.cardQuestions = []; 
			card.cardAnswers = []; 
			startMenu();
		} else{
			console.log("\n\nNo cards were deleted!\n")
			startMenu();
		};
	});
	
};

function promptAnswer(){
	if(count < card.cardQuestions.length){
		inquirer.prompt([{
			name: "answer",
			type: "input",
			message: "What is the answer to the question?"
		}]).then(function(task){
			if(task.answer.toLowerCase() === answer){
				console.log("Correct!\n\n");
			} else{
				console.log("Not quite!");
				console.log(question + "\n\n");
				console.log(answer);
			};

			count++;
		});
	} else {
		startMenu();
	};
};

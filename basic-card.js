var fs = require("fs");

//Prototype for basic card format
function BasicCard (front, back){
	this.question = front;
	this.answer = back;
};

function ClozeCard (cloze, full){
	this.cloze = cloze;
	this.full = full;
	this.partial = full.replace(cloze, "...");
	this.error = function(){
		if(this.full.includes(this.cloze) === false){
			console.log("Oops. This is not the right answer!");
		};
	};
};

//Dummy variables
var cardType = "basic";
var data;
var logFile = "";

var basicQues = "Who was the pioneer of classical conditioning?";
var basicAnswer = "Ian Pavolv";

var clozeFull = "Ian Pavolv was the pioneer of classical conditioning.";
var clozeAnswer = "Ian Pavolv";

var cardBasic = new BasicCard(basicQues, basicAnswer);
var cardCloze = new ClozeCard(clozeFull, clozeAnswer);

//Storing data
	if(cardType === "basic"){
		data = {
				"question": cardBasic.front,
				"answer": cardBasic.back
			};
		logFile = "basic-card-data.json";
	} else if(cardType === "basic"){
		data = {
				"full": cardCloze.full,
				"clozure": cardCloze.cloze
			};
		logFile = "cloze-card-data.json";

	} else {
		return;
	};

	fs.appendFile(logFile, JSON.stringify(data), 'utf8', function(error) {
		if (error){
			console.log(error);
		} else{
			console.log('The "data to append" was appended to file!');
		};
	});
	

//Retrieving data


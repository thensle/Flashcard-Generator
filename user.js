var basic = require("./basic-card.js");
var cloze = require("./cloze-card.js");
var fs = require("fs");

var cardType = process.argv[2].toLowerCase();
//For later to create cards
var question = process.argv[3];
var answer = process.argv[4];

//Prototype for basic card format
function BasicCard (front, back){
	this.question = front;
	this.answer = back;
};

function ClozeCard (cloze, full){
	this.cloze = cloze;
	this.full = full;
	this.partial = full.replace(cloze, "...");
	this.error = function(full, cloze){
		if(full.includes(cloze) === false){
			console.log("Oops. This is not the right answer!");
		};
	};
};



switch (cardType){
	case "basic":
		var cardBasic = new BasicCard(question, answer);
		basicreadFile();
		break;
	case "clozure":
		var cardCloze = new ClozeCard(question, answer);
		clozereadFile();
		break;
	default:
		console.log("Oops, not a valid card type. Try again!");
		break;
	};

function basicreadFile(){
	fs.readFile("basic-card-data.txt", "utf8", function(error, data){
		if (error){
			console.log("Search failed to save - error " + error);
		} else {
			var logsArray = data.split('\n');
			for(var i = 0; i < logsArray.length; i++){
				if(logsArray[i] != ""){
					console.log(logsArray[i]);
				};
				
			};

		};
	});
};

function readFile(){
	fs.readFile("cloze-card-data.txt", "utf8", function(error, data){
		if (error){
			console.log("Search failed to save - error " + error);
		} else {
			var logsArray = data.split('\n');
			for(var i = 0; i < logsArray.length; i++){
				if(logsArray[i] != ""){
					console.log(logsArray[i]);
				};
				
			};

		};
	});
};
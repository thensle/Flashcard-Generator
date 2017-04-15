var fs = require("fs");

//Prototype for basic card format
function BasicCard (front, back){
	this.question = front;
	this.answer = back;
};


//Dummy variables


var basicQues = "Who was the pioneer of classical conditioning?";
var basicAnswer = "Ian Pavolv";

var clozeFull = "Ian Pavolv was the pioneer of classical conditioning.";
var clozeAnswer = "Ian Pavolv";




//Storing data
function writeFile(cardBasic){
	var dataCard = {
				"question": cardBasic.front,
				"answer": cardBasic.back
			};

	fs.appendFile("basic-card-data.txt", JSON.stringify(dataCard) + '\n', function(error){
		if(error){
			console.log("Error type:" + error);
		} else {
			console.log("Card Saved!");
		};
	});
};

//Retrieving data
function readFile(){
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

module.exports = {
	read: readFile,
	write: writeFile
};



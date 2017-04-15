var fs = require("fs");

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


function writeFile(cardCloze){
	var dataCard = {
				"full": cardCloze.full,
				"clozure": cardCloze.cloze
			};

	fs.appendFile("cloze-card-data.txt", JSON.stringify(dataCard) + '\n', function(error){
		if(error){
			console.log("Error type:" + error);
		} else {
			console.log("Card Saved!");
		};
	});
};

//Retrieving data
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

module.exports = {
	read: readFile,
	write: writeFile
};
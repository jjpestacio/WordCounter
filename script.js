/*-------- Functions ----------*/

// Calls count for everything on keyup event
function count() {
	countChars();
	countParagraphs();
	countSentences();
	countText();
	countWords();
}

// Counts all characters except '\n'
function countChars() {
	let textBody = document.getElementById('input').value;

	// Doesn't count newlines
	document.getElementById('countCharsResult').innerHTML = textBody.trim().replace(/[\r\n]+/, "").length;
}

// Counts paragraphs as '\n' followed by any number of characters.
// Lone '\n' are not counted as paragraphs.
function countParagraphs() {
	let textBody = document.getElementById('input').value;
	let paragraphs = textBody.split(/[\r\n]/);
	let count = 0;

	for(let i = 0; i < paragraphs.length; i++)
		if(paragraphs[i].trim().length) // Non empty sentences
			count++;

	document.getElementById('countParagraphsResult').innerHTML = count;
}

// Counts sentences as any number of characters following [.?!\n]
// which includes new paragraphs. It does not count consecutive [.?!\n]
// as new sentences.
function countSentences() {
	let textBody = document.getElementById('input').value;
	let sentences = textBody.split(/[.?!\n]/);
	let count = 0;

	for(let i = 0; i < sentences.length; i++)
		if(sentences[i].trim().length) // Non empty sentences
			count++;

	document.getElementById('countSentencesResult').innerHTML = count;
}

// Counts number of occurences of the user specified text in the main
// textarea
function countText() {
	let textBody = document.getElementById('input').value;
	let text = document.getElementById('textToCount').value;

	// Clear if there is no text to count
	if(text.length == 0) {
		document.getElementById('countTextResult').innerHTML = "";
		return;
	}

	// Find all occurences of text in textBody
	let count = 0;
	let pos = 0;
	while(true) {
		pos = textBody.indexOf(text, pos);
		if(pos == -1) break; // No more occurences
		else {
			count++;
			pos++;
		}
	}

	document.getElementById('countTextResult').innerHTML = "<b>\"" + text + "\" " + "Count: </b>" + count;
}

// Counts words as any number of characters separated by any type of whitespace
function countWords() {
	let textBody = document.getElementById('input').value;
	let count = 0;

	// If text was not entered, the word count would be 0
	if(textBody.length != 0)
		count = textBody.trim().split(/\s+/).length;

	document.getElementById('countWordsResult').innerHTML = count;
}

/*----- Listeners -----*/

// Waits for DOM to load
document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('input').addEventListener('keyup', count, false);
	document.getElementById('textToCount').addEventListener('keyup', countText, false);
});


window.onload = function() {
	document.getElementById('execute').addEventListener('click', execRegex, false);
};

function execRegex() {
	var checkboxArray = document.getElementsByClassName("chbox");

	for (var i = 0; i < 10; i++) {
		//console.log(text);
		if (checkboxArray[i].checked) {
			switch(i) {
				case 0: findEmails(checkboxArray[i]); break;
				case 1: findURL(checkboxArray[i]); break;
				case 2: checkIP(checkboxArray[i]); break;
				case 3: findDate(checkboxArray[i]); break;
				case 4: checkState(checkboxArray[i]); break;
				case 5: findTagsWithAttributes(checkboxArray[i]); break;
				case 6: replaceEmails(checkboxArray[i]); break;
				case 7: replaceSecondLetterToUpperCase(checkboxArray[i]); break;
				case 8: replaceOldTags(checkboxArray[i]); break;
				case 9: wrapWords(checkboxArray[i]); break;
			}
		} else {
			checkboxArray[i].parentNode.querySelector('label').innerHTML = "";
		}
	}
};

function findEmails(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	var matches = text.match(/\b[\w\d_]+@\w+\.\w{2,3}\b/g);
	if (matches) {
		for (var i = 0; i < matches.length; i++) {
			if (i == 0) {
				label.innerHTML = matches[i] + '<br>';
			} else {
				label.innerHTML += matches[i] + '<br>';
			}
		}
	}
	console.log(matches);
}

function findURL(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	var matches = text.match(/\bhttp[s]?:\/\/w{3}\.[\w\d]+\.\w{2,3}\/[\w\W]*\s/g);
	if (matches) {
		for (var i = 0; i < matches.length; i++) {
			matches[i].trim();
			if (i == 0) {
				label.innerHTML = matches[i] + '<br>';
			} else {
				label.innerHTML += matches[i] + '<br>';
			}
		}
	}
	console.log(matches);
}

function checkIP(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	var matches = text.match(/((25[0-5]|2[0-4]\d|1?\d\d?)\.){3}(25[0-5]|2[0-4]\d|1?\d\d?)/g);
	if (matches) {
		for (var i = 0; i < matches.length; i++) {
			matches[i].trim();
			if (i == 0) {
				label.innerHTML = matches[i] + '<br>';
			} else {
				label.innerHTML += matches[i] + '<br>';
			}
		}
	}
	console.log(matches);
}

function findDate(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	var matches = text.match(/\b(\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{4})\b/g);
	if (matches) {
		for (var i = 0; i < matches.length; i++) {
			//matches[i].trim();
			if (i == 0) {
				label.innerHTML = matches[i] + '<br>';
			} else {
				label.innerHTML += matches[i] + '<br>';
			}
		}
	}
	console.log(matches);
}

function checkState(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	var matches = text.match(/\b(A[LKZR])\b|\bC[AOT]\b|\bDE\b|\bFL\b|\bGA\b|\bHI\b|\bI[DLNA]\b|\bK[SY]\b|\bLA\b|\bM[EDAINSOT]\b|\bN[EVHJMYCD]\b|\bO[HKR]\b|\bPA\b|\bRI\b|\bS[CD]\b|\bT[NX]\b|\bUT\b|\bV[TA]\b|\bW[AVIY]\b|/g);
	if (matches) {
		for (var i = 0; i < matches.length; i++) {
			if (matches[i]) {
				if (i == 0) {
					label.innerHTML = matches[i] + '<br>';
				} else {
					label.innerHTML += matches[i] + '<br>';
				}
			}
		}
	}
	console.log(matches);
}

function findTagsWithAttributes(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	var matches = text.match(/<\w+\s+.+?>/g);
	//console.log(matches[0]);
	if (matches) {
		for (var i = 0; i < matches.length; i++) {
			if (i == 0) {
				label.innerHTML = '<xmp>' + matches[i] + '</xmp>';
			} else {
				label.innerHTML += '<xmp>' + matches[i] + '</xmp>';
			}
		}
	}
	console.log(matches);
}

function replaceEmails(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	text = text.replace(/\b[\w\d_]+@\w+\.\w{2,3}\b/g, "<a href='mailto:$&'>$&</a>");
	label.innerHTML = text + '<br>';
	console.log(matches);
}

function replaceSecondLetterToUpperCase(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	text = text.replace(/\b\w{2}/g, function(p1) { return p1[0] + p1[1].toUpperCase() });
	label.innerHTML = text + '<br>';
	console.log(matches);
}

function replaceOldTags(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	text = text.replace(/(\<\/?strike\>)|(\<\/?u\>)/g, function(tag) {
		if (tag === '<strike>' || tag === '</strike>') { return (tag[1] === '/') ? '</del>' : '<del>' }
		else { return (tag[1] === '/') ? '</ins>' : '<ins>'; }
	});
	console.log(text);
	label.innerHTML = '<xmp>' + text + '</xmp>';
	console.log(matches);
}

function wrapWords(checkbox) {
	var text = document.getElementById('textbox').value;
	var label = checkbox.parentNode.querySelector('label');
	text = text.replace(/\b\w{1,4}\b/g, function(word) { return '<b>' + word + '</b>' });
	//console.log(text);
	label.innerHTML = text + '<br>';
	console.log(matches);
}
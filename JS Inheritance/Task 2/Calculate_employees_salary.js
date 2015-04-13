window.onload = function() {
	document.getElementById("json-btn").addEventListener("click", getJSON, false);
	document.getElementById("getNames").addEventListener("click", getNames, false);
	document.getElementById("getIds").addEventListener("click", getIds, false);
}

function getJSON() {
	initialize();
}

function initialize() {

	var employeeCollection = new EmployeeCollection();
	var employeeFactory = new EmployeeFactory();

	try {
		var jsonContent = JSON.parse(document.getElementById("json").value);
	} catch(e) {
		alert("Try paste new JSON content. This is not JSON content.");
		return;
	}

	for ( var i = 0; i < jsonContent.length; i++ ) {
		employeeCollection.addEmployee(employeeFactory.createEmployee(jsonContent[i]));
	}

	EmployeeCollection.setInstance(employeeCollection);

	outputCollection();

}

function outputCollection() {
	var employeeCollection = EmployeeCollection.getInstance()();
	console.log(employeeCollection.employeeCollection);
	employeeCollection.sortEmployee();
	var label = document.getElementById("collection");
	label.innerHTML ="";
	for (i = 0; i < employeeCollection.size(); i++) {
			
		label.innerHTML += employeeCollection.getEmployee(i).getId() + ', ';
		label.innerHTML += employeeCollection.getEmployee(i).getName() + ', ';
		label.innerHTML += employeeCollection.getEmployee(i).getSalary() + '<br>';

	}
}

function getNames() {
	var nameArray = [];
	var employeeCollection = EmployeeCollection.getInstance()();
	var counter = +document.getElementById("namesAmount").value;
	if ( counter > employeeCollection.size() ) { 
		alert("Collection has " + employeeCollection.size() + " items");
		return; 
	}
	var label = document.getElementById("namesOutput");
	var tempName;
	for (var i = 0; i < counter; i++) {
		tempName = employeeCollection.getEmployee(i).getName();
		if (tempName) {
			nameArray.push(tempName);
		}
	}
	label.innerHTML = nameArray;
}

function getIds() {
	console.log(document.getElementById("idsAmount").value);
	var idArray = [];
	var employeeCollection = EmployeeCollection.getInstance()();
	var counter = +document.getElementById("idsAmount").value;
	if ( counter > employeeCollection.size() ) { 
		alert("Collection has " + employeeCollection.size() + " items");
		return; 
	}
	var label = document.getElementById("idsOutput");
	var tempId;
	for (var i = employeeCollection.size() - 1; i >= employeeCollection.size() - counter; i--) {
		tempId = employeeCollection.getEmployee(i).getId();
		if (tempId) {
			idArray.push(tempId);
		}
	}
	label.innerHTML = idArray;
}
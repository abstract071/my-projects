function EmployeeCollection() {

	var employeeCollection = this.employeeCollection || [];
	var instance;

	this.getEmployee = function(index) {
		return employeeCollection[index];
	}

	this.addEmployee = function(employee) {
		employeeCollection.push(employee);
	}

	this.size = function() {
		return employeeCollection.length;
	}

	this.sortEmployee = function() {
		var sortSalary = employeeCollection.sort(function (a, b) {
			var sortSalaryResult = b.getSalary() - a.getSalary();
			if (sortSalaryResult) { return sortSalaryResult; }
			else {
				if (a.getName() > b.getName()) {
					return 1;
				}
				if (a.getName() < b.getName()) {
					return -1;
				}
				return 0;
			}
		});
	} 
};

EmployeeCollection.setInstance = function(inst) {
	instance = inst;
}
EmployeeCollection.getInstance = function() {
	return function() { return this.instance; };
}

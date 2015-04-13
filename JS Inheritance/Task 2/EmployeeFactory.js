function EmployeeFactory() {}

EmployeeFactory.prototype.createEmployee = function(employee) {
	var employeeClass = null;

	if (employee.type === "FixedSalaryEmployee") {
		employeeClass = FixedSalaryEmployee;
	} else if (employee.type === "HourlySalaryEmployee") {
		employeeClass = HourlySalaryEmployee;
	} else {
		throw new Error("Can not create instance of the Employee subclass in employee factory method");
	}

	return new employeeClass(employee);
}
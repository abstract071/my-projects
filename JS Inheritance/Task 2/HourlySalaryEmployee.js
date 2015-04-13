function HourlySalaryEmployee(properties) {
	Employee.apply(this, arguments);

	var type = properties.type || "";

}

HourlySalaryEmployee.prototype = Object.create(Employee.prototype);
HourlySalaryEmployee.prototype.constructor = HourlySalaryEmployee;

HourlySalaryEmployee.prototype.getSalary = function() {
	return this.getPrivateSalary() * 8 * 20;
};
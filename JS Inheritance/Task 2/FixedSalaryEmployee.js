function FixedSalaryEmployee(properties) {
	Employee.apply(this, arguments);
	
	var type = properties.type || "";

}


FixedSalaryEmployee.prototype = Object.create(Employee.prototype);
FixedSalaryEmployee.prototype.constructor = FixedSalaryEmployee;

FixedSalaryEmployee.prototype.getSalary = function() {
	return this.getPrivateSalary();
};
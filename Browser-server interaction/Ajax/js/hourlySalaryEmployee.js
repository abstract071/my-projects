/**
 * Created by Vlad on 28.11.2014.
 */

    function HourlySalaryEmployee(properties) {
        Employee.apply(this, arguments);

        var type = properties.type || "";

        this.getType = function() {
            return type;
        };
        this.setType = function(someType) {
            type = someType;
        };

        this.toJSON = function() {
            return {
                id: this.getId(),
                name: this.getName(),
                salary: this.getSalary(),
                type: this.getType()
            };
        }
    }

    HourlySalaryEmployee.prototype = Object.create(Employee.prototype);
    HourlySalaryEmployee.prototype.constructor = HourlySalaryEmployee;

    HourlySalaryEmployee.prototype.getMonthlySalary = function() {
        return this.getSalary() * 8 * 20;
    };

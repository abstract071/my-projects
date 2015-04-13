/**
 * Created by Vlad on 30.11.2014.
 */

    //function EmployeeFactory() {}

    var employeeFactory = function (employee) {
    //console.log(employee);
        var employeeClasses = {HourlySalaryEmployee: HourlySalaryEmployee,
                               FixedSalaryEmployee: FixedSalaryEmployee};
//console.log(employeeClasses[employee.type]);
        if (employeeClasses[employee.type]) {
            return new employeeClasses[employee.type](employee);
        } else {
            throw new Error("Can not create instance of the Employee subclass in employee factory method");
        }
    };

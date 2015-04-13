/**
 * Created by Vlad on 30.11.2014.
 */
define(function (require) {

    'use strict';

    var FixedSalaryEmployee = require('./fixedSalaryEmployee');
    var HourlySalaryEmployee = require('./hourlySalaryEmployee');

    var createEmployee = function(employee) {
        var employeeClasses = {FixedSalaryEmployee: FixedSalaryEmployee,
                               HourlySalaryEmployee: HourlySalaryEmployee};

        if (employeeClasses[employee.type]) {
            return new employeeClasses[employee.type](employee);
        } else {
            throw new Error("Can not create instance of the Employee subclass in employee factory method");
        }
    };

    return createEmployee;
});
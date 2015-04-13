/**
 * Created by Vlad on 28.11.2014.
 */
define(function (require) {

    'use strict';

    var Employee = require('./employee');

    function FixedSalaryEmployee(properties) {
        Employee.apply(this, arguments);

        var type = properties.type || "";

        this.getType = function() {
            return type;
        };
    }


    FixedSalaryEmployee.prototype = Object.create(Employee.prototype);
    FixedSalaryEmployee.prototype.constructor = FixedSalaryEmployee;

    FixedSalaryEmployee.prototype.getSalary = function() {
        return this.getPrivateSalary();
    };

    return FixedSalaryEmployee;
});
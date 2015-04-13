/**
 * Created by Vlad on 28.11.2014.
 */
define(function (require) {

    'use strict';

    var Employee = require('./employee');

    function HourlySalaryEmployee(properties) {
        Employee.apply(this, arguments);

        var type = properties.type || "";

        this.getType = function() {
            return type;
        };
    }

    HourlySalaryEmployee.prototype = Object.create(Employee.prototype);
    HourlySalaryEmployee.prototype.constructor = HourlySalaryEmployee;

    HourlySalaryEmployee.prototype.getSalary = function() {
        return this.getPrivateSalary() * 8 * 20;
    };

    return HourlySalaryEmployee;
});
/**
 * Created by Vlad on 01.12.2014.
 */
define(function() {

    'use strict';

    function EmployeeCollection() {

        var employeeCollection = [];

        this.getEmployee = function(index) {
            return employeeCollection[index];
        };

        this.addEmployee = function(employee) {
            employeeCollection.push(employee);
        };

        this.size = function() {
            return employeeCollection.length;
        };

        this.sortEmployee = function() {
            employeeCollection.sort(function (a, b) {
                var sortSalaryResult = b.getSalary() - a.getSalary();
                if (sortSalaryResult) { return sortSalaryResult; }
                else {
                    if (a.getName() < b.getName()) {
                        return 1;
                    }
                    if (a.getName() > b.getName()) {
                        return -1;
                    }
                    return 0;
                }
            });
        };
    }

    return EmployeeCollection;
});
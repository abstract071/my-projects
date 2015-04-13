/**
 * Created by Vladyslav_Mykhailenk on 11/28/2014.
 */
define(function () {

    'use strict';

    function Employee(properties) {

        if (this.constructor === Employee) {
            throw new Error("This is abstract class. It can't be istantiated.");
        }

        var salary = properties.salary || 0;
        var name = properties.name || "";
        var id = properties.id || 0;

        this.getPrivateSalary = function() {
            return salary;
        };
        this.getPrivateName = function() {
            return name;
        };
        this.getPrivateId = function() {
            return id;
        };
    }

    Employee.prototype = {
        getName: function() { return this.getPrivateName(); },
        getSalary: function() {},
        getId: function() { return this.getPrivateId(); }
    };
    Employee.prototype.constructor = Employee;

    return Employee;
});
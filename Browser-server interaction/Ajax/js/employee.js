/**
 * Created by Vladyslav_Mykhailenk on 11/28/2014.
 */

    function Employee(properties) {

        if (this.constructor === Employee) {
            throw new Error("This is abstract class. It can't be istantiated.");
        }

        var salary = properties.salary || 0;
        var name = properties.name || "";
        var id = properties.id || 0;

        this.getSalary = function() {
            return salary;
        };
        this.setSalary = function(someSalary) {
            salary = someSalary;
        };

        this.getName = function() {
            return name;
        };
        this.setName = function(someName) {
            name = someName;
        };

        this.getId = function() {
            return id;
        };
        this.setId = function(generatedId) {
            id = generatedId;
        };
    }

    Employee.prototype = {
        //getName: function() { return this.getName(); },
        getterForSalary: function() {  }
        //getId: function() { return this.getId(); }
    };
    Employee.prototype.constructor = Employee;

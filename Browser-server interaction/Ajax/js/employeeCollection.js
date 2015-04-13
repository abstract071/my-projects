/**
 * Created by Vlad on 01.12.2014.
 */

    function EmployeeCollection() {

        var employeeCollection = this.employeeCollection || [];


        this.getEmployee = function(index) {
            return employeeCollection[index];
        };

        this.editEmployee = function(id) {
            for (var i = 0; i < employeeCollection.length; i++) {
                if (employeeCollection[i].getId() === id) {
                    //employeeCollection[i].setName($('#employee-name').val());
                    //employeeCollection[i].setSalary(+$('#employee-salary').val());
                    //employeeCollection[i].setType($('#employee-type').val());
                    this.removeEmployee(id);
                    this.addEmployee(employeeFactory({
                        id: id,
                        name: $('#employee-name').val(),
                        salary: +$('#employee-salary').val(),
                        type: $('#employee-type').val()
                    }));
                    break;
                }
            }
        };

        this.addEmployee = function(employee) {
            employeeCollection.push(employee);
        };

        this.removeEmployee = function(id) {
            for (var i = 0; i < employeeCollection.length; i++) {
                if (employeeCollection[i].getId() === id) {
                    employeeCollection.splice(i, 1);
                }
            }
        };

        this.generateId = function() {
            var id;
            var isIdExist;
            for (var i = 0; ;i++) {
                isIdExist = false;
                id = (Math.random()*1000)|0;
                for (var j = 0; j < employeeCollection.length; j++) {
                    if (employeeCollection[j].getId() === id) {
                        isIdExist = true;
                        break;
                    }
                }
                if (!isIdExist) {
                    return id;
                }
            }
        };

        this.size = function() {
            return employeeCollection.length;
        };

        this.sortEmployee = function() {
            /*var sortSalary = */employeeCollection.sort(function (a, b) {
                var sortSalaryResult = b.getMonthlySalary() - a.getMonthlySalary();
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

        this.toJSON = function() {
            var array = [];

            for ( var i = 0; i < employeeCollection.length; i++) {
                array.push(employeeCollection[i]);
            }

            return array;
        };

        //this.getIds = function() {
        //    var arrayOfIds = this.employeeCollection.getNames();
        //};

        this.empty = function() {
            employeeCollection = [];
        };
    }

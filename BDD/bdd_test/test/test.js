/**
 * Created by Vladyslav_Mykhailenk on 11/28/2014.
 */
define(function (require) {

    'use strict';

    var Employee = require('app/employee');

    describe('Creating instance of the abstract class', function () {
        it('should throw an exception', function () {
            expect( function() { new Employee(); } ).toThrow();
        });
    });

    //----------------------------------------------------------------------------------------------
    //In next two tests is checked access to randomly chosen private fields
    //----------------------------------------------------------------------------------------------

    var FixedSalaryEmployee = require('app/fixedSalaryEmployee');
    var HourlySalaryEmployee = require('app/hourlySalaryEmployee');

    describe('Direct access to private fields in the parent class Employee through its child', function () {
        it('should have no access to private field directly from HourlySalaryEmployee class', function () {
            var hourlySalaryEmployee = new HourlySalaryEmployee({type: "HourlySalaryEmployee",
                                                                 salary: 50,
                                                                 name: "John Doe",
                                                                 id: 999});
            expect(hourlySalaryEmployee.salary).toBeUndefined();
        });

        it('should have no access to private field directly from FixedSalaryEmployee class', function () {
            var fixedSalaryEmployee = new FixedSalaryEmployee({type: "FixedSalaryEmployee",
                                                               salary: 5000,
                                                               name: "John Doe",
                                                               id: 999});
            expect(fixedSalaryEmployee.name).toBeUndefined();
        });
    });

    //----------------------------------------------------------------------------------------------
    //Testing EmployeeFactory class
    //----------------------------------------------------------------------------------------------

    var createEmployee = require('app/employeeFactory');

    describe('Creating an employee with right type parameter', function () {
        it('should be equal to instance of the regular HourlySalaryEmployee instance', function () {
            var hourlySalaryFactoryEmployee = createEmployee({ type: "HourlySalaryEmployee",
                                                               salary: 50,
                                                               name: "John Doe",
                                                               id: 999 });
            expect(hourlySalaryFactoryEmployee instanceof HourlySalaryEmployee).toBeTruthy();
        });

        it('should be equal to instance of the regular FixedSalaryEmployee instance', function () {
            var fixedSalaryFactoryEmployee = createEmployee({ type: "FixedSalaryEmployee",
                                                              salary: 50,
                                                              name: "John Doe",
                                                              id: 999 });
            expect(fixedSalaryFactoryEmployee instanceof FixedSalaryEmployee).toBeTruthy();
        });

        it('should throw an exception because of class types incompatibility ', function () {
            expect( function() { createEmployee({ type: "someSalaryEmployee",
                                                  salary: 50,
                                                  name: "John Doe",
                                                  id: 999 }); } ).toThrow();
        });
    });

    //----------------------------------------------------------------------------------------------
    //Testing EmployeeCollection class
    //----------------------------------------------------------------------------------------------

    var EmployeeCollection = require('app/employeeCollection');
    var employeeCollection = new EmployeeCollection();

    describe('Testing methods of the employees collection', function () {
        var hourlySalaryEmployee = new HourlySalaryEmployee({ type: "HourlySalaryEmployee",
                                                              salary: 50,
                                                              name: "John Doe",
                                                              id: 999 });
        it('should add an instance of the HourlySalaryEmployee class to collection', function () {
            employeeCollection.addEmployee(hourlySalaryEmployee);
            expect(employeeCollection.size()).toBeGreaterThan(0);
        });

        it('should return an instance of the HourlySalaryEmployee class from collection', function () {
            employeeCollection.addEmployee(hourlySalaryEmployee);
            expect(employeeCollection.getEmployee(0)).toEqual(hourlySalaryEmployee);
        });

        it('should contain three employees in the collection because of previous additions', function () {
            employeeCollection.addEmployee(hourlySalaryEmployee);
            expect(employeeCollection.size()).toBe(3);
        });

        it('should sort right based on only the employees salary', function () {
            employeeCollection = new EmployeeCollection();
            employeeCollection.addEmployee(new HourlySalaryEmployee({ type: "HourlySalaryEmployee",
                                                                      salary: 50,
                                                                      name: "John Doe",
                                                                      id: 998 }));
            employeeCollection.addEmployee(new HourlySalaryEmployee({ type: "HourlySalaryEmployee",
                                                                      salary: 60,
                                                                      name: "Johanna Doe",
                                                                      id: 999 }));
            employeeCollection.sortEmployee();
            expect(employeeCollection.getEmployee(0).getId()).toBe(999);
        });

        it('should sort descendantly based on the employees names because of salary equality', function () {
            employeeCollection = new EmployeeCollection();
            employeeCollection.addEmployee(new HourlySalaryEmployee({ type: "HourlySalaryEmployee",
                                                                      salary: 50,
                                                                      name: "A",
                                                                      id: 998 }));
            employeeCollection.addEmployee(new HourlySalaryEmployee({ type: "HourlySalaryEmployee",
                                                                      salary: 50,
                                                                      name: "B",
                                                                      id: 999 }));
            employeeCollection.sortEmployee();
            expect(employeeCollection.getEmployee(0).getName()).toEqual('B');
        });

    });

});
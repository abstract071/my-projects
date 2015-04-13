/**
 * Created by Vlad on 30.11.2014.
 */
define(function (require) {

    var EmployeeFactory = require('app/employeeFactory');
    var FixedSalaryEmployee = require('app/fixedSalaryEmployee');
    var HourlySalaryEmployee = require('app/hourlySalaryEmployee');

    describe('Creating an employee with right type parameter', function () {
        it('should be equal to instance of the regular HourlySalaryEmployee instance', function () {
            var hourlySalaryFactoryEmployee = new EmployeeFactory().createEmployee({type: "HourlySalaryEmployee",
                                                                                  salary: 50,
                                                                                  name: "John Doe",
                                                                                  id: 999});
            expect(hourlySalaryFactoryEmployee instanceof HourlySalaryEmployee).toBeTruthy();
        });
    });
});
/**
 * Created by Vladyslav_Mykhailenk on 12/3/2014.
 */
define(function(require) {

    'use strict';

    var EmployeeCollection = require('./employeeCollection');

    var singletonCollection = (function () {
        var instance;
        function createInstance() {
            return new EmployeeCollection();
        }
        return {
            getInstance: function() {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    })();

    return singletonCollection;
});
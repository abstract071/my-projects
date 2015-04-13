/**
 * Created by Vladyslav_Mykhailenk on 11/28/2014.
 */
define(function (require) {

    'use strict';

    var createEmployee = require('./employeeFactory');
    var singletonCollection = require('./singletonCollection');

    window.onload = function() {
        document.getElementById("json-btn").addEventListener("click", getJSON, false);
        document.getElementById("getNames").addEventListener("click", getNames, false);
        document.getElementById("getIds").addEventListener("click", getIds, false);
    };

    function getJSON() {
        initialize();
    }

    function initialize() {

        var employeeCollection = singletonCollection.getInstance();
        var jsonContent;

        try {
            jsonContent = JSON.parse(document.getElementById("json").value);
        } catch(e) {
            alert("Try paste new JSON content. This is not JSON content.");
            return;
        }

        for ( var i = 0; i < jsonContent.length; i++ ) {
            try {
                employeeCollection.addEmployee(createEmployee(jsonContent[i]));
            } catch(e) {
                console.error(e.message);
            }
        }

        outputCollection(employeeCollection);

    }

    function outputCollection(employeeCollection) {
        employeeCollection.sortEmployee();
        var label = document.getElementById("collection");
        label.innerHTML ="ID, NAME, SALARY" + "<br>";
        for (var i = 0; i < employeeCollection.size(); i++) {

            label.innerHTML += employeeCollection.getEmployee(i).getId() + ", ";
            label.innerHTML += employeeCollection.getEmployee(i).getName() + ", ";
            label.innerHTML += employeeCollection.getEmployee(i).getSalary() + "<br>";

        }
    }

    function getNames() {
        var nameArray = [];
        var employeeCollection = singletonCollection.getInstance();
        var counter = +document.getElementById("namesAmount").value;
        if ( counter > employeeCollection.size() ) {
            alert("Collection has " + employeeCollection.size() + " items");
            return;
        }
        var label = document.getElementById("namesOutput");
        var tempName;
        for (var i = 0; i < counter; i++) {
            tempName = employeeCollection.getEmployee(i).getName();
            if (tempName) {
                nameArray.push(tempName);
            }
        }
        label.innerHTML = nameArray;
    }

    function getIds() {
        //console.log(document.getElementById("idsAmount").value);
        var idArray = [];
        var employeeCollection = singletonCollection.getInstance();
        var counter = +document.getElementById("idsAmount").value;
        if ( counter > employeeCollection.size() ) {
            alert("Collection has " + employeeCollection.size() + " items");
            return;
        }
        var label = document.getElementById("idsOutput");
        var tempId;
        for (var i = employeeCollection.size() - 1; i >= employeeCollection.size() - counter; i--) {
            tempId = employeeCollection.getEmployee(i).getId();
            if (tempId) {
                idArray.push(tempId);
            }
        }
        label.innerHTML = idArray;
    }

    return window.onload();
});


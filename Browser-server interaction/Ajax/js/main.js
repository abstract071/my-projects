/**
 * Created by Vladyslav_Mykhailenk on 11/28/2014.
 */

    $(document).ready(function() {
        initialize();
        $('#add-btn').on('click', renderAddModal);
        $('#remove-btn').on('click', renderRemoveModal);
        $('#edit-btn').on('click', renderEditModal);
        $('#save').on('click', sendToServer);
        $('#retrieve').on('click', initialize);
        $('#optionsModal').on('hidden.bs.modal', function () {
            $('.modal-footer button').last().off('click', addEmployee);
            $('.modal-footer button').last().off('click', removeEmployee);
            $('.modal-footer button').last().off('click', editEmployee);
        });
    });

    function sendToServer(event) {
        $.ajax({
            type: "PUT",
            url: "https://ajaxexample.firebaseio.com/.json",
            data: JSON.stringify(singletonCollection.getInstance())
        });
    }

    function initialize() {

        var employeeCollection = singletonCollection.getInstance();
        employeeCollection.empty();

        $.get("https://ajaxexample.firebaseio.com/.json", function(data) {

            for ( var i = 0; i < data.length; i++ ) {
                try {
                employeeCollection.addEmployee(employeeFactory(data[i]));
                } catch(e) {
                    console.error("Something wrong with JSON content. Can't parse it.");
                    return;
                }
            }

            outputCollection(employeeCollection);
        });

    }

    function outputCollection(employeeCollection) {

        //console.log(employeeCollection.size());
        employeeCollection.sortEmployee();

        var $tbody = $("#collection tbody");
        $tbody.empty();
        var $fragment = $(document.createDocumentFragment());
        var $row;
        for (var i = 0; i < employeeCollection.size(); i++) {
            $row = $('<tr></tr>').append('<td>' + employeeCollection.getEmployee(i).getId() + '</td>')
                .append('<td>' + employeeCollection.getEmployee(i).getName() + '</td>')
                .append('<td>' + employeeCollection.getEmployee(i).getMonthlySalary() + '</td>')
                .append('<td>' + employeeCollection.getEmployee(i).getType() + '</td>');
            $fragment.append($row);
        }

        $tbody.append($fragment);
    }

    function renderAddModal(event) {
        initModal(event);

        var fields = ['name', 'salary', 'type'];
        var $body = $('.modal-body form').empty();
        var $div;
        for (var i = 0; i < 2; i++) {
            $body.append('<div></div>');
            $div = $body.children().last();
            $div.addClass('form-group');
            $div.append('<label></label>').append('<input>');
            $div.children().first().attr({for: 'employee-' + fields[i], class: 'control-label'}).text('Enter ' + fields[i] + ' of the employee:');
            $div.children().last().attr({type: 'text', class: 'form-control', id: $div.children().first().attr('for')});
        }

        $body.append('<div></div>');
        $div = $body.children().last();
        $div.addClass('form-group');
        $div.append('<label></label>').append('<select>');
        $div.children().first().attr({for: 'employee-' + fields[i], class: 'control-label'}).text('Choose ' + fields[2] + ' of salary:');
        $div.children().last().attr({class: 'form-control', id: $div.children().first().attr('for')});
        $div.children().last().append('<option>FixedSalaryEmployee</option>').append('<option>HourlySalaryEmployee</option>');


        $('.modal-footer button').last().on('click', addEmployee);
        $('#employee-name').blur(checkNameInputValue);
        $('#employee-salary').blur(checkSalaryInputValue);
    }

    function addEmployee(event) {

        $('.modal-footer button').last().attr('data-dismiss', 'modal');

        var employeeCollection = singletonCollection.getInstance();

        if ($('.form-group span').hasClass('glyphicon-remove')) {
            $('.modal-footer button').last().removeAttr('data-dismiss');
        } else {
            try {
                employeeCollection.addEmployee(employeeFactory({
                    id: employeeCollection.generateId(),
                    name: $('#employee-name').val(),
                    salary: +$('#employee-salary').val(),
                    type: $('#employee-type').val()
                }));
                outputCollection(employeeCollection);
            } catch (e) {
                console.error(e);
                return;
            }
        }

        //console.log($(this));
    }

    function renderRemoveModal(event) {
        initModal(event);

        var $body = $('.modal-body form').empty();
        $body.append('<div></div>');
        var $div = $body.children().last();
        $div.addClass('form-group');
        $div.append('<label></label>').append('<input>');
        $div.children().first().attr({for: 'employee-id', class: 'control-label'}).text('Enter ID for the removing employee:');
        $div.children().last().attr({type: 'text', class: 'form-control', id: $div.children().first().attr('for')});

        $('.modal-footer button').last().on('click', removeEmployee);
        $('#employee-id').blur(checkIdInputValue);
    }

    function removeEmployee(event) {

        $('.modal-footer button').last().attr('data-dismiss', 'modal');

        var employeeCollection = singletonCollection.getInstance();

        if ($('.form-group span').hasClass('glyphicon-remove')) {
            $('.modal-footer button').last().removeAttr('data-dismiss');
        } else {
            try {
                employeeCollection.removeEmployee(+$('#employee-id').val());
                outputCollection(employeeCollection);
            } catch (e) {
                console.error(e);
                return;
            }
        }
    }

    function renderEditModal(event) {
        initModal(event);

        var fields = ['ID', 'name', 'salary', 'type'];
        var $body = $('.modal-body form').empty();

        $body.append('<div></div>');
        var $div = $body.children().last();
        $div.addClass('form-group');
        $div.append('<label></label>').append('<input>');
        $div.children().first().attr({for: 'employee-id', class: 'control-label'}).text('Enter ' + fields[0] + ' to find needed employee:');
        $div.children().last().attr({type: 'text', class: 'form-control', id: $div.children().first().attr('for')});

        for (var i = 1; i < 3; i++) {
            $body.append('<div></div>');
            $div = $body.children().last();
            $div.addClass('form-group');
            $div.append('<label></label>').append('<input>');
            $div.children().first().attr({for: 'employee-' + fields[i], class: 'control-label'}).text('Enter new ' + fields[i] + ':');
            $div.find('input').attr({type: 'text', class: 'form-control', id: $div.children().first().attr('for')});
        }
        $body.append('<div></div>');
        $div = $body.children().last();
        $div.addClass('form-group');
        $div.append('<label></label>').append('<select>');
        $div.children().first().attr({for: 'employee-' + fields[i], class: 'control-label'}).text('Choose ' + fields[3] + ' of salary:');
        $div.children().last().attr({class: 'form-control', id: $div.children().first().attr('for')});
        $div.children().last().append('<option>FixedSalaryEmployee</option>').append('<option>HourlySalaryEmployee</option>');

        $('.modal-footer button').last().on('click', editEmployee);
        $('#employee-id').blur(checkIdInputValue);
        $('#employee-name').blur(checkNameInputValue);
        $('#employee-salary').blur(checkSalaryInputValue);
    }

    function checkIdInputValue(event) {
        var employeeCollection = singletonCollection.getInstance();

        //Validation by ID
        var check = false,
            employee;
        for (var i = 0; i < employeeCollection.size(); i++) {
            if (employeeCollection.getEmployee(i).getId() === +$('#employee-id').val()) {
                check = true;
                employee = employeeCollection.getEmployee(i);
                break;
            }
        }

        //If id is ok, show right icon
        if (check) {
            $('.form-group').attr('class', 'form-group has-success has-feedback');
            for (i = 0; i < $('.form-group').length; i++) {
                if (!$('.form-group').eq(i).has('span').length) {
                    $('<span></span>').insertAfter($('.form-group input').eq(i)).attr({
                        class: 'glyphicon glyphicon-ok form-control-feedback',
                        'aria-hidden': 'true'
                    });
                } else {
                    $('.form-group span').eq(i).attr({
                        class: 'glyphicon glyphicon-ok form-control-feedback',
                        'aria-hidden': 'true'
                    });
                }
            }
            //If id is ok, fill in other inputs fields
            $('#employee-name').val(employee.getName());
            $('#employee-salary').val(employee.getSalary());
            $('#employee-type').val(employee.getType());
        }
        //If id isn't ok, show another icon
        else {
            $('.form-group').attr('class', 'form-group has-error has-feedback');
            for (i = 0; i < $('.form-group').length; i++) {
                if (!$('.form-group').eq(i).has('span').length) {
                    $('<span></span>').insertAfter($('.form-group input').eq(i)).attr({
                        class: 'glyphicon glyphicon-remove form-control-feedback',
                        'aria-hidden': 'true'
                    });
                } else {
                    $('.form-group span').eq(i).attr({
                        class: 'glyphicon glyphicon-remove form-control-feedback',
                        'aria-hidden': 'true'
                    });
                }
            }
            //If id is wrong, empty other inputs fields
            $('#employee-name').val('');
            $('#employee-salary').val('');
        }
    }

    function checkNameInputValue(event) {
        if ($(event.target).val().match(/^[a-zA-Z ]+$/)) {
            $(event.target).parent().attr('class', 'form-group has-success has-feedback');
            if (!$(event.target).next().is('span')) {
                $('<span></span>').insertAfter($(event.target)).attr({class: 'glyphicon glyphicon-ok form-control-feedback',
                    'aria-hidden': 'true'});
            } else {
                $(event.target).next('span').attr({class: 'glyphicon glyphicon-ok form-control-feedback',
                    'aria-hidden': 'true'});
            }
        } else {
            $(event.target).parent().attr('class', 'form-group has-error has-feedback');
            if (!$(event.target).next().is('span')) {
                $('<span></span>').insertAfter($(event.target)).attr({class: 'glyphicon glyphicon-remove form-control-feedback',
                    'aria-hidden': 'true'});
            } else {
                $(event.target).next('span').attr({class: 'glyphicon glyphicon-remove form-control-feedback',
                    'aria-hidden': 'true'});
            }
        }
    }

    function checkSalaryInputValue(event) {
        if ($(event.target).val().trim().match(/^[0-9]+$/)) {
            $(event.target).parent().attr('class', 'form-group has-success has-feedback');
            if (!$(event.target).next().is('span')) {
                $('<span></span>').insertAfter($(event.target)).attr({class: 'glyphicon glyphicon-ok form-control-feedback',
                    'aria-hidden': 'true'});
            } else {
                $(event.target).next('span').attr({class: 'glyphicon glyphicon-ok form-control-feedback',
                    'aria-hidden': 'true'});
            }
        } else {
            $(event.target).parent().attr('class', 'form-group has-error has-feedback');
            if (!$(event.target).next().is('span')) {
                $('<span></span>').insertAfter($(event.target)).attr({class: 'glyphicon glyphicon-remove form-control-feedback',
                    'aria-hidden': 'true'});
            } else {
                $(event.target).next('span').attr({class: 'glyphicon glyphicon-remove form-control-feedback',
                    'aria-hidden': 'true'});
            }
        }
    }

    function editEmployee(event) {

        //console.log($('.form-group span').hasClass('glyphicon-remove'));

        $('.modal-footer button').last().attr('data-dismiss', 'modal');

        var employeeCollection = singletonCollection.getInstance();

        if ($('.form-group span').hasClass('glyphicon-remove')) {
            $('.modal-footer button').last().removeAttr('data-dismiss');
        } else {
            try {
                employeeCollection.editEmployee(+$('#employee-id').val());
                outputCollection(employeeCollection);
            } catch (e) {
                console.error(e);
                return;
            }
        }
    }

    function initModal(event) {
        $('#title').html($(event.target).html());
        $('.modal-footer button').last().attr('data-dismiss', 'modal');
        $('.modal-footer button').last().html($(event.target).html().split(' ')[1]);
    }
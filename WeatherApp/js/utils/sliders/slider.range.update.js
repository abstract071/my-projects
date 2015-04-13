/**
 * Created by Vlad on 15.01.2015.
 */
define([
    'vendor'
], function(Vendor) {
    'use strict';

    var $ = Vendor.$;

    var updateRangeSlider = function () {
        $(function() {
            $( "#update-time-range" ).slider({
                range: "max",
                value: 15,
                step: 15,
                min: 0,
                max: 60,
                slide: function( event, ui ) {
                    $( "#options-minutes" ).val( ui.value );
                }
            });
            $( "#options-minutes" ).val( $( "#update-time-range" ).slider( "value" ) );
        });
    };

    return updateRangeSlider;
});
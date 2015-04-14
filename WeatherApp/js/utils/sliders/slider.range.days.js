/**
 * Created by Vlad on 14.01.2015.
 */
define([
    'vendor'
], function(Vendor) {
    'use strict';

    var $ = Vendor.$;

    var daysRangeSlider = function () {
        $(function() {
            $( "#day-range" ).slider({
                range: "max",
                value: 7,
                min: 1,
                max: 7,
                slide: function( event, ui ) {
                    $( "#options-days" ).val( ui.value );
                },
                stop: function() {
                    //console.log($('#options-days').val());
                    //var $weekForecastItems = $('.bxslider > li.active .week-forecast li');
                    var $weekForecastBlocks = $('.bxslider .week-forecast');
                    //console.log($weekForecastBlocks);
                    //console.log($weekForecastBlocks.size());
                    //console.log($weekForecastBlocks.eq($weekForecastBlocks.size()));
                    $weekForecastBlocks.each(function() {
                        //console.log(this);
                        var $weekForecastItems = $(this).find('li');
                        for (var i = 0; i < $weekForecastItems.size(); i++) {
                            $weekForecastItems.eq(i).removeClass('hide-border-bottom');
                            if (i < $('#options-days').val()) {
                                $weekForecastItems.eq(i).slideDown();
                                if (i === ($('#options-days').val() - 1)) {
                                    $weekForecastItems.eq(i).addClass('hide-border-bottom');
                                }
                            } else {
                                $weekForecastItems.eq(i).slideUp();
                            }
                        }
                    });
                }
            });
            $( "#options-days" ).val( $( "#day-range" ).slider( "value" ) );
        });
    };

    return daysRangeSlider;
});
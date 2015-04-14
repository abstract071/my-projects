/**
 * Created by Vladyslav_Mykhailenk on 1/11/2015.
 */
define(/*'components/dashboard/dashboard-view', */[
    'vendor'
    //'text!components/page/page.tpl',
    //'utils/sliders/slider.scrollbar'
], function (Vendor/*, pageTemplate, scrollbarSlider*/) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class;
        //ForecastIO;

    var ForecastIO = (function () {

        var forecastURL = "https://api.forecast.io/forecast/";
        var forecastAPIKEY = "5454479574cce92c82b460be661b3441/";

        return {
            getForecastIOResponse: function(latitude, longitude, cityName) {
                var forecastDeferred = $.Deferred();
                $.getJSON(forecastURL + forecastAPIKEY + latitude + ',' + longitude + '?callback=?', function (data, forecastStatus) {
                    //console.log(data);
                    if (cityName) {
                        forecastDeferred.resolve(cityName, data);
                    } else {
                        forecastDeferred.resolve(data);
                    }
                });
                return forecastDeferred;
            }
        };

    })();


    return ForecastIO;
});
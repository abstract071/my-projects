/**
 * Created by Vlad on 10.01.2015.
 */
define([
    'vendor'
    //'components/search/search-view'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor/*, SearchView*/) {
    'use strict';

    var /*$ = Vendor.$,*/
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        WeatherDataCollection;

    WeatherDataCollection = Class.extend({
        defaultOptions: {
            //weatherDataArray: []
        },
        constructor: function (/*options*/) {
            this.weatherDataArray = [];
            this.initialize();
        },
        //getCityData: function (index) {
        //    return this.weatherDataArray[index];
        //},
        initialize: function () {
            //this.searchView = new SearchView({ rootHolder: '#wrapper' });
        },
        getCityData: function (cityName) {
            return _.find(this.weatherDataArray, { cityName: cityName });
        },
        addCityData: function (weather) {
            this.weatherDataArray.push(weather);
            emitter.trigger('addCityData', weather);
        },
        removeCityData: function (cityName) {
            _.remove(this.weatherDataArray, function(cityData) { return cityData.cityName === cityName; });
            console.log(this.weatherDataArray);
        },
        size: function () {
            return this.weatherDataArray.length;
        }


    });

    var singletonCollection = (function () {
        var instance;
        function createInstance() {
            return WeatherDataCollection;
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

    return singletonCollection.getInstance();
});
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
            try {
                var filteredData = this.filterData(weather);
                this.weatherDataArray.push(filteredData);
                emitter.trigger('addCityData', filteredData);
            } catch (error) {
                console.error("Wrong type of an object");
            }
        },
        removeCityData: function (cityName) {
            _.remove(this.weatherDataArray, function(cityData) { return cityData.cityName === cityName; });
            //console.log(this.weatherDataArray);
        },
        filterData: function(weatherData) {
            return _.assign({}, _.pick(weatherData, 'cityName', 'latitude', 'longitude', 'temperature', 'convertToCelsius'),
                _.pick(weatherData.currently, 'icon', 'summary', 'temperature'),
                { 'daily': _.reduce(_.initial(weatherData.daily.data, 1), function(resultObj, day, index) {
                    resultObj[index] = _.pick(day, 'icon', 'temperatureMin', 'temperatureMax');
                    return resultObj;
                }, []) },
                { 'hourly': _.reduce(_.initial(weatherData.hourly.data, 25), function(resultObj, hour, index) {
                    resultObj[index] = _.pick(hour, 'icon', 'temperature', 'time');
                    return resultObj;
                }, []) });
        },
        size: function () {
            return this.weatherDataArray.length;
        }


    });

    var singletonCollection = (function () {
        var instance;
        function createInstance() {
            return new WeatherDataCollection();
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

    return singletonCollection.getInstance;
});
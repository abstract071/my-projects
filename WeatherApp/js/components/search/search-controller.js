/**
 * Created by Vladyslav_Mykhailenk on 1/6/2015.
 */
define([
    'vendor',
    'components/search/search-view',
    'components/models/city-weather',
    'components/models/weather-data-collection'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor, SearchView, CityWeather, WeatherDataCollection) {
    'use strict';

    var /*$ = Vendor.$,*/
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        SearchController;

    SearchController = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            //this.tpl = _.template(searchTemplate);
            this.initialize();
            //this.render();
        },
        initialize: function () {
            this.searchView = new SearchView({ rootHolder: '#wrapper', rootSearchResultHolder: '.cities' });
            this.cityWeather = new CityWeather({});
            this.weatherDataCollection = new WeatherDataCollection();
            //console.log(emitter._listeners);
            //emitter.on('click', function(a, b, c) { console.log('Add button was clicked ' + a + ' ' + b + ' ' + c); }, this);
        }

    });

    return SearchController;
});
/**
 * Created by Vladyslav_Mykhailenk on 1/6/2015.
 */
define([
    'vendor',
    'components/search/search-view',
    './city-weather',
    './weather-data-collection',
    'geoservice',
    'forecastioservice'
], function (Vendor, SearchView, CityWeather, WeatherDataCollection, GoogleGeoService, ForecastIOService) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        modernizr = Vendor.Modernizr,
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
            this.weatherDataCollection = new WeatherDataCollection();

            emitter.on('searchStateHasChanged', this.getPlacesPredictions, this);
            emitter.on('addCityToCollection', this.addCity, this);
            emitter.on('addCityData', this.saveToLocalStorage, this);

            if (modernizr.localstorage && localStorage['collection']) {
                this.restoreCollectionFromLocalStorage();
            } else {
                this.getDataFromGeolocation();
            }
        },
        getDataFromGeolocation: function () {
            var self = this;

            if (modernizr.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) { self.showPosition(position, self); });
            }
        },
        showPosition: function(position, self) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var geocoderDeferred = GoogleGeoService.getAddressForGeolocationRequest(latLng);
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            var forecastDeferred = ForecastIOService.getForecastIOResponse(position.coords.latitude, position.coords.longitude);

            $.when(geocoderDeferred, forecastDeferred).then(function(cityName, data) {
                data.cityName = cityName;
                var cityElement = self.weatherDataCollection.filterData(new CityWeather(data))/*new CityWeather(data)*/;
                self.weatherDataCollection.addCityData(cityElement);
                self.searchView.renderSearchResult(cityElement, false);
                self.saveToLocalStorage(self.weatherDataCollection);
            });
        },
        getPlacesPredictions: function() {

            var self = this,
                $input = $('input[name=cityname]');

            $('.add-btn').switchClass("icon-add", "icon-check");
            if (!$input.val()) {
                $('.cities').empty();
                $('.add-btn').switchClass("icon-check", "icon-add");
                _(this.weatherDataCollection.weatherDataArray).forEach(function(cityData) {
                    self.searchView.renderSearchResult(cityData, false);
                });
            }
            var predictionsDeferred = GoogleGeoService.getCitiesPredictions($input.val());
            predictionsDeferred.then(function(data) {
                $('.cities').empty();
                data.forEach(function (obj) {
                    var cityElement;
                    var isChecked = false;
                    _(self.weatherDataCollection.weatherDataArray).forEach(function (cityData) {
                        if (cityData.cityName === obj.description) {
                            isChecked = true;
                        }
                    });
                    cityElement = new CityWeather({cityName: obj.description}, data);
                    self.searchView.renderSearchResult(cityElement, isChecked);
                });
            });
        },
        addCity: function() {

            $('.add-btn').switchClass("icon-check", "icon-add");

            var promises = [],
                self = this;

            $('.cities input[type=checkbox]').each(function(obj) {

                if ($(this).is(':checked')) {
                    var cityName = $(this).parent().find('.city-text').text();
                    console.log(cityName);
                    var geocoderDeferred = GoogleGeoService.getCoordinatesForAutocompleteService(cityName);

                    var forecastDeferred = geocoderDeferred.then(function(LtdLng) {
                        //console.log(LtdLng);
                        //console.log(LtdLng.A);
                        //console.log(LtdLng.F);
                        return ForecastIOService.getForecastIOResponse(LtdLng.A, LtdLng.F, cityName);
                    });
                    promises.push(forecastDeferred);
                }
            });

            $.when.apply(undefined, promises).then(function() {

                console.log(arguments);
                var citiesData = Array.prototype.slice.call(arguments);
                console.log(citiesData);
                if (promises.length > 1) {
                    _(citiesData).forEach(function (cityData) {
                        cityData[1].cityName = cityData[0];
                        var cityElement = self.weatherDataCollection.filterData(new CityWeather(cityData[1]));
                        self.weatherDataCollection.addCityData(cityElement/*new CityWeather(cityData[1])*/);
                    });
                } else {
                    citiesData[1].cityName = citiesData[0];
                    var cityElement = self.weatherDataCollection.filterData(new CityWeather(citiesData[1]));
                    self.weatherDataCollection.addCityData(cityElement/*new CityWeather(citiesData[1])*/);
                }
                _(self.weatherDataCollection.weatherDataArray).forEach(function (cityData) {
                    self.searchView.renderSearchResult(cityData, false);
                });

                self.saveToLocalStorage(self.weatherDataCollection);
            });

            $('input[name=cityname]').val('');
            $('.cities').empty();

        },
        saveToLocalStorage: function() {
            if (modernizr.localstorage && this.weatherDataCollection.size()) {
                console.log("Modernizr is working!!!");

                var str = JSON.stringify(this.weatherDataCollection);
                localStorage['collection'] = str;
                if (!localStorage['typeOfDegrees']) {
                    localStorage['typeOfDegrees'] = $('.degrees.active').data('identifier');
                }
            }/* else {
                alert("Sorry, your browser does not support local storage.");
            }*/
        },
        restoreCollectionFromLocalStorage: function() {
            var self = this;
            if (modernizr.localstorage && localStorage['collection']) {
                var collection = JSON.parse(localStorage['collection']);
                collection.forEach(function(element) {
                    self.searchView.renderSearchResult(element/*cityElement*/, /*true*/false);
                    $('.cities input[type=checkbox]').prop('checked', true);
                });
                emitter.trigger('addCityToCollection');
            }
        }
    });

    return SearchController;
});
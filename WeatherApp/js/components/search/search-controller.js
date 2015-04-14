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
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
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
            //this.cityWeather = new CityWeather({});
            this.weatherDataCollection = new WeatherDataCollection();
            //if (modernizr.localstorage) {
            //    console.log("Modernizr is working!!!");
            //}

            //console.log(emitter._listeners);
            //emitter.on('click', function(a, b, c) { console.log('Add button was clicked ' + a + ' ' + b + ' ' + c); }, this);
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
            //(function getLocation() {
            //console.log(this);
            var self = this;

            if (modernizr.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) { self.showPosition(position, self); });
            } /*else {
                return;
            }*/
            //Modernizer
            //})();


        },
        showPosition: function(position, self) {

            //var self = this;

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //console.log(GoogleGeoService);
            var geocoderDeferred = GoogleGeoService.getAddressForGeolocationRequest(latLng);

            var forecastDeferred = ForecastIOService.getForecastIOResponse(position.coords.latitude, position.coords.longitude);
            //console.log(forecastDeferred);

            $.when(geocoderDeferred, forecastDeferred).then(function(cityName, data) {

                //console.log(data);
                data.cityName = cityName;
                //console.log(data);
                var cityElement = self.weatherDataCollection.filterData(new CityWeather(data))/*new CityWeather(data)*/;
                //console.log(data);
                //console.log(cityElement);
                //console.log(_.pluck(cityElement.hourly, 'time'));
                self.weatherDataCollection.addCityData(cityElement);
                //console.log(self.weatherDataCollection.getCityData(cityName));
                //console.log(self.weatherDataCollection.weatherDataArray);
                //self.weatherDataCollection = new WeatherDataCollection();
                //console.log(self.weatherDataCollection.weatherDataArray);
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
                //console.log($(this));
                $('.add-btn').switchClass("icon-check", "icon-add");
                _(this.weatherDataCollection.weatherDataArray).forEach(function(cityData) {
                    self.searchView.renderSearchResult(cityData, false);
                });
            }
            var predictionsDeferred = GoogleGeoService.getCitiesPredictions($input.val());
            predictionsDeferred.then(function(data) {
                $('.cities').empty();
                //console.log(data);
                data.forEach(function (obj) {
                    //console.log(data);
                    var cityElement;
                    var isChecked = false;
                    _(self.weatherDataCollection.weatherDataArray).forEach(function (cityData) {
                        //console.log(cityData);
                        if (cityData.cityName === obj.description) {
                            isChecked = true;
                        }
                    });
                    //console.log(isChecked);
                    cityElement = new CityWeather({cityName: obj.description}, data);
                    self.searchView.renderSearchResult(cityElement, isChecked);
                });
            });
        //});
        },
        addCity: function() {
            //$('.icon-add').on('click', function(e) {


            //if ($('.add-btn').hasClass('icon-add')) {
            //    return;
            //}
            $('.add-btn').switchClass("icon-check", "icon-add");

            //var cityData = [];
            var promises = [],
                self = this;

            $('.cities input[type=checkbox]').each(function(obj) {

                if ($(this).is(':checked')) {
                    var cityName = $(this).parent().find('.city-text').text();
                    console.log(cityName);
                    var geocoderDeferred = GoogleGeoService.getCoordinatesForAutocompleteService(cityName);

                    //var forecastDeferred = $.Deferred();
                    var forecastDeferred = geocoderDeferred.then(function(LtdLng) {
                        //console.log(LtdLng);
                        return ForecastIOService.getForecastIOResponse(LtdLng.k, LtdLng.D, cityName);
                        //var forecastDeferred = $.Deferred;
                        //$.getJSON(forecastURL + forecastAPIKEY + LtdLng.k + ',' + LtdLng.D + '?callback=?', function (data, forecastStatus) {
                        //    //console.log(data);
                        //    cityData.push(data);
                        //    forecastDeferred.resolve(cityName, data);
                        //});
                    });
                    promises.push(forecastDeferred);
                    //console.log(promises);
                }
            });

            //console.log(promises);
            $.when.apply(undefined, promises).then(function() {

                console.log(arguments);
                var citiesData = Array.prototype.slice.call(arguments);
                console.log(citiesData);
                if (promises.length > 1) {
                    _(citiesData).forEach(function (cityData) {
                        //console.log(arguments);
                        //console.log(cityData);
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
                //console.log(self.weatherDataCollection.weatherDataArray);

                self.saveToLocalStorage(self.weatherDataCollection);
            });

            $('input[name=cityname]').val('');
            $('.cities').empty();

        //});
        },
        saveToLocalStorage: function() {
            if (modernizr.localstorage && this.weatherDataCollection.size()) {
                console.log("Modernizr is working!!!");

                var str = JSON.stringify(this.weatherDataCollection);
                //console.log(str);
                //console.log(JSON.parse(str));
                //if (this.weatherDataCollection.size()) {
                localStorage['collection'] = str;
                if (!localStorage['typeOfDegrees']) {
                    localStorage['typeOfDegrees'] = $('.degrees.active').data('identifier');
                }
                //}
            }/* else {
                alert("Sorry, your browser does not support local storage.");
            }*/
        },
        restoreCollectionFromLocalStorage: function() {
            var self = this;
            if (modernizr.localstorage && localStorage['collection']) {
                var collection = JSON.parse(localStorage['collection']);
                //console.log(collection);
                collection.forEach(function(element) {
                    //console.log(element);
                    //var cityElement = new CityWeather(element);
                    //self.weatherDataCollection.addCityData(cityElement);
                    self.searchView.renderSearchResult(element/*cityElement*/, /*true*/false);
                    $('.cities input[type=checkbox]').prop('checked', true);
                });
                emitter.trigger('addCityToCollection');
            }
        }

    });

    return SearchController;
});
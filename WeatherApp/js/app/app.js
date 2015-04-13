/**
 * Created by Vladyslav_Mykhailenk on 12/25/2014.
 */
define([
    'vendor',
    //'components/page/page',
    'components/dashboard/dashboard-controller',
    //'components/page/page-controller',
    'components/search/search-controller',
    'components/settings/settings-controller',
    'components/models/city-weather'
], function(Vendor, DashboardController/*, PageController*/, SearchController, SettingsController, CityWeather) {
    'use strict';

    var _ = Vendor._;

    var App = function() {
        var emitter = Vendor.util.EventEmitter;
        var dashboardController = new DashboardController();
        var searchController = new SearchController();
        var settingsController = new SettingsController();



        $(document).ready(function() {









            var $input = $('input[name=cityname]');


            var autocomplete = new google.maps.places.AutocompleteService();
            var geocoder = new google.maps.Geocoder();
            var defaultBounds = new google.maps.LatLngBounds( new google.maps.LatLng(-90, -180),
                                                              new google.maps.LatLng(90, 180) );

            var forecastURL = "https://api.forecast.io/forecast/";
            var forecastAPIKEY = "5454479574cce92c82b460be661b3441/";





            (function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    return;
                }
            })();

            function showPosition(position) {

                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var geocoderDeferred = $.Deferred();
                geocoder.geocode( { 'latLng': latLng }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var cityData = _.find(results, function(element) {
                            return element.types[0] === 'locality' && element.types[1] === 'political';
                        });
                        geocoderDeferred.resolve(cityData.formatted_address);
                    }
                });

                var forecastDeferred = $.Deferred();
                $.getJSON(forecastURL + forecastAPIKEY + position.coords.latitude + ',' + position.coords.longitude + '?callback=?', function (data, forecastStatus) {
                    //console.log(data);
                    forecastDeferred.resolve(data);
                });

                $.when(geocoderDeferred, forecastDeferred).then(function(cityName, data) {

                    var cityElement = new CityWeather(filterData(cityName, data));
                    //console.log(data);
                    console.log(cityElement);
                    searchController.weatherDataCollection.addCityData(cityElement);
                    searchController.searchView.renderSearchResult(cityElement, false);

                });


            }






            $input.on('input', function() {



                $('.add-btn').switchClass("icon-add", "icon-check");

                if (!$(this).val()) {
                    $('.cities').empty();
                    console.log($(this));
                    $('.add-btn').switchClass("icon-check", "icon-add");
                    _(searchController.weatherDataCollection.weatherDataArray).forEach(function(cityData) {
                        searchController.searchView.renderSearchResult(cityData, false);
                    });
                }

                autocomplete.getPlacePredictions({input: $input.val(), types: ['(cities)']/*, bounds: defaultBounds*/}, function(data) {
                    $('.cities').empty();
                    console.log(data);
                    data.forEach(function(obj) {



                        //console.log(data);
                        var cityElement;
                        var isChecked = false;

                        _(searchController.weatherDataCollection.weatherDataArray).forEach(function(cityData) {
                            //console.log(cityData);
                            if (cityData.cityName === obj.description) {
                                isChecked = true;
                            }
                        });

                        //console.log(isChecked);
                        cityElement = new CityWeather({ cityName: obj.description }, data);
                        searchController.searchView.renderSearchResult(cityElement, isChecked);


                    });



                }/*, PlacesServiceStatus*/);
            });


            $('.icon-add').on('click', function(e) {


                if ($(this).hasClass('icon-add')) {
                    return;
                }
                $(this).switchClass("icon-check", "icon-add");

                var cityData = [];
                var promises = [];

                $('.cities input[type=checkbox]').each(function(obj) {

                    if ($(this).is(':checked')) {
                        var cityName = $(this).parent().find('.city-text').text();
                        var geocoderDeferred = $.Deferred();
                        geocoder.geocode( { 'address': cityName }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {

                                var LtdLng = results[0].geometry.location;
                                geocoderDeferred.resolve(LtdLng);

                            }
                        });

                        var forecastDeferred = $.Deferred();
                        geocoderDeferred.then(function(LtdLng) {
                            //console.log(LtdLng);
                            $.getJSON(forecastURL + forecastAPIKEY + LtdLng.k + ',' + LtdLng.D + '?callback=?', function (data, forecastStatus) {
                                console.log(data);
                                cityData.push(data);
                                forecastDeferred.resolve(cityName, data);
                            });
                        });
                        promises.push(forecastDeferred);

                    }

                });

                console.log(promises);
                $.when.apply(undefined, promises).then(function() {

                    var citiesData = Array.prototype.slice.call(arguments);
                    if (promises.length > 1) {
                        _(citiesData).forEach(function (cityData) {
                            //console.log(arguments);
                            console.log(cityData);

                            searchController.weatherDataCollection.addCityData(new CityWeather(filterData(cityData[0], cityData[1])));
                        });
                    } else {
                        searchController.weatherDataCollection.addCityData(new CityWeather(filterData(citiesData[0], citiesData[1])));
                    }
                    _(searchController.weatherDataCollection.weatherDataArray).forEach(function (cityData) {
                        searchController.searchView.renderSearchResult(cityData, false);
                    });
                });

                $input.val('');
                $('.cities').empty();

            });






            $('.delete-btn').click(function() {
                //console.log('try to delete');


                $('.cities input[type=checkbox]').each(function(obj) {
                    console.log($(this));
                    if ($(this).is(':checked')) {
                        var cityName = $(this).parent().find('.city-text').text();
                        searchController.weatherDataCollection.removeCityData(cityName);
                        dashboardController.pageController.pageView.removeSlides(cityName);
                    }
                });
                $('.cities').empty();
                _(searchController.weatherDataCollection.weatherDataArray).forEach(function (cityData) {
                    searchController.searchView.renderSearchResult(cityData, false);
                });
            });







            var filterData = function(cityName, weatherData) {
                return _.assign({}, {'cityName': cityName},
                                _.pick(weatherData, 'latitude', 'longitude'),
                                _.pick(weatherData.currently, 'icon', 'summary', 'temperature'),
                                { 'daily': _.reduce(_.initial(weatherData.daily.data, 1), function(resultObj, day, index) {
                                    resultObj[index] = _.pick(day, 'icon', 'temperatureMin', 'temperatureMax');
                                    return resultObj;
                                }, []) },
                                { 'hourly': _.reduce(_.initial(weatherData.hourly.data, 25), function(resultObj, hour, index) {
                                    resultObj[index] = _.pick(hour, 'icon', 'temperature', 'time');
                                    return resultObj;
                                }, []) });
            };









            $('.sidebar-btn').on('click', function() {
                $('.sidebar').stop().toggle('slide', { direction: 'right', easing: 'linear' }, 1300);
                if (!$(this).hasClass('closed')) {
                    $(this).animate({left: (($('.sidebar-wrapper').width() - $(this).position().left - $(this).width()) / parseFloat($(this).css('font-size'))) + 'em'}, {
                        duration: 1000,
                        easing: 'linear'
                    });
                    $(this).addClass('closed');
                } else {
                    $(this).removeClass('closed');
                    $(this).delay(300).animate({left: (($('.sidebar-wrapper').width() - $(this).position().left - $(this).width()) / parseFloat($(this).css('font-size'))) + 'em'}, {
                        duration: 1000,
                        easing: 'linear'
                    });
                }
            });
        });




    };




    return App;
});


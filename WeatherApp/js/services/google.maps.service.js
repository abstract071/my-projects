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
        //Autocomplete;

    var Autocomplete = (function () {

        var autocomplete = new google.maps.places.AutocompleteService();
        var geocoder = new google.maps.Geocoder();
        var defaultBounds = new google.maps.LatLngBounds( new google.maps.LatLng(-90, -180),
                                                          new google.maps.LatLng(90, 180) );

        return {
            getAddressForGeolocationRequest: function(latLng) {
                //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var geocoderDeferred = $.Deferred();
                geocoder.geocode( { 'latLng': latLng }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var cityData = _.find(results, function(element) {
                            return element.types[0] === 'locality' && element.types[1] === 'political';
                        });
                        geocoderDeferred.resolve(cityData.formatted_address);
                    }
                });
                return geocoderDeferred;
            },
            getCoordinatesForAutocompleteService: function(cityName) {
                var geocoderDeferred = $.Deferred();
                geocoder.geocode( { 'address': cityName }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {

                        var LtdLng = results[0].geometry.location;
                        geocoderDeferred.resolve(LtdLng);

                    }
                });
                return geocoderDeferred;
            },
            getCitiesPredictions: function(inputValue) {
                var predictionsDeferred = $.Deferred();
                autocomplete.getPlacePredictions({input: inputValue, types: ['(cities)']/*, bounds: defaultBounds*/}, function(data) {
                    predictionsDeferred.resolve(data);
                }/*, PlacesServiceStatus*/);
                return predictionsDeferred;
            }
        };

    })();


    return Autocomplete;
});









/**
 * Created by Vladyslav_Mykhailenk on 1/11/2015.
 */
define(/*'components/dashboard/dashboard-view', */[
    'vendor',
    'text!components/page/page.tpl',
    'utils/sliders/slider.scrollbar'
], function (Vendor, pageTemplate, scrollbarSlider) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        Autocomplete;

    Autocomplete = function () {

        var autocomplete = new google.maps.places.AutocompleteService();
        var geocoder = new google.maps.Geocoder();
        var defaultBounds = new google.maps.LatLngBounds( new google.maps.LatLng(-90, -180),
                                                          new google.maps.LatLng(90, 180) );

        return {
            getAddressForGeolocationRequest: function(latLng) {},
            getCoordinatesForAutocompleteService: function(cityName) {},
            getCitiesPredictions: function(inputValue) {}
        };

    };


    return Autocomplete;
});









/**
 * Created by Vladyslav_Mykhailenk on 12/25/2014.
 */
define([
    'vendor',
    'components/dashboard/dashboard-controller',
    'components/search/search-controller',
    'components/settings/settings-controller',
    'components/models/city-weather'
], function(Vendor, DashboardController, SearchController, SettingsController, CityWeather) {
    'use strict';

    var _ = Vendor._;

    var App = function() {
        //var emitter = Vendor.util.EventEmitter;
        var dashboardController = new DashboardController();
        var searchController = new SearchController();
        var settingsController = new SettingsController();


        $(document).ready(function() {

            $('.delete-btn').click(function() {
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


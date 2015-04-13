/**
 * Created by Vladyslav_Mykhailenk on 1/6/2015.
 */
define(/*'components/dashboard/dashboard-view', */[
    'vendor',
    'components/dashboard/dashboard-view',
    'components/page/page-controller',
    'utils/gallery/bxslider',
    'components/models/weather-data-collection'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor, DashboardView, PageController, bxSlider, WeatherDataCollection) {
    'use strict';

    var /*$ = Vendor.$,*/
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        DashboardController;

    DashboardController = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            //this.tpl = _.template(boardTemplate);
            this.initialize();
            //this.render();
        },
        initialize: function () {
            //this.collectElements();
            this.dashboardView = new DashboardView({ rootHolder: '#container' });
            this.pageController = new PageController();
            this.weatherDataCollection = new WeatherDataCollection();
            this.bxslider = bxSlider();
            emitter.on('addCityData', this.addCityWeatherSlider, this);
            emitter.on('removeSlides', this.removeSlides, this);
        },
        addCityWeatherSlider: function(cityData) {
            //console.log(cityData);
            //var self = this;
            //_(collection).forEach(function(cityData) {
            //    console.log(cityData.cityName.split(','));
            //console.log(this.bxslider.getSlideCount());
            var cityNameAttr = this.pageController.pageView.renderSearchResult(cityData);
            this.pageController.addScrollbarSlider();
            //this.pageController.renderTemperatureRanges();
            this.bxslider.reloadSlider();
            this.pageController.renderTemperatureRanges(cityNameAttr);
            //this.bxslider.reloadSlider();
            //});
        },
        removeSlides: function(cityName) {
            var self = this;
            $('.bxslider > li:not(.bx-clone)').each(function() {
                if ($(this).data('city-name') === cityName) {
                    $(this).fadeOut(1000, function() {
                        $(this).remove();
                        self.bxslider.reloadSlider();
                    });
                }
            });
        }
    });

    return DashboardController;
});
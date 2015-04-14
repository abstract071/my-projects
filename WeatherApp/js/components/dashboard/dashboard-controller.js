/**
 * Created by Vladyslav_Mykhailenk on 1/6/2015.
 */
define([
    'vendor',
    'components/dashboard/dashboard-view',
    'components/page/page-controller',
    'utils/gallery/bxslider'
], function (Vendor, DashboardView, PageController, bxSlider) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        modernizr = Vendor.Modernizr,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        DashboardController;

    DashboardController = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            this.initialize();
        },
        initialize: function () {
            this.dashboardView = new DashboardView({ rootHolder: '#container' });
            this.pageController = new PageController();
            this.bxslider = bxSlider();
            this.reloadOptions = function(startSlide) {
                return {
                    controls: false,
                    slideMargin: 10,
                    startSlide: startSlide,
                    onSliderLoad: function(currentIndex) {
                        $('.bxslider > li').removeClass('active');
                        $('.bxslider > li').eq(currentIndex + 1).addClass('active');
                    },
                    onSlideBefore: function($slideElement, oldIndex, newIndex) {
                        $('.bxslider > li').removeClass('active');
                        $('.bxslider > li').eq(newIndex + 1).addClass('active');
                    }
                };
            };
            emitter.on('addCityData', this.addCityWeatherSlider, this);
            emitter.on('removeSlides', this.removeSlides, this);
            emitter.on('transformDegrees', this.transformDegrees, this);
        },
        addCityWeatherSlider: function(cityData) {
            if (modernizr.localstorage) {
                var typeOfDegrees = localStorage['typeOfDegrees'];
            } else {
                typeOfDegrees = $('.degrees.active').data('identifier');
            }
            var cityNameAttr = this.pageController.pageView.renderSearchResult(cityData, typeOfDegrees);
            this.pageController.addScrollbarSlider(cityData.cityName.replace(/\s+/g, ''), $('[data-city-name="' + cityNameAttr + '"]'));
            var bxslider = this.bxslider;
            if (bxslider.getSlideCount()) {
                var currentSlideIndex = this.bxslider.getCurrentSlide();
                bxslider.reloadSlider(this.reloadOptions(currentSlideIndex));
            } else {
                bxslider.reloadSlider(this.reloadOptions(0));
            }
            this.pageController.renderTemperatureRanges(cityNameAttr);
        },
        removeSlides: function(cityName) {
            var self = this;

            var $slides = $('.bxslider > li:not(.bx-clone)');
            for (var i = 0; i < $slides.size(); i++) {
                if ($slides.eq(i).data('city-name') === cityName) {
                    $slides.eq(i).fadeOut(1000, function() {
                        $(this).remove();
                        var currentSlideIndex = self.bxslider.getCurrentSlide();
                        if (currentSlideIndex >= i) {
                            self.bxslider.reloadSlider(self.reloadOptions(currentSlideIndex - 1));
                        } else {
                            self.bxslider.reloadSlider(self.reloadOptions(currentSlideIndex));
                        }
                    });
                    return;
                }
            }

        },
        transformDegrees: function(event) {
            if (!$(event.target).hasClass('active')) {
                $('.degrees').removeClass('active');
                $(event.target).addClass('active');
                console.time("Time changing temperature text");
                $('.bxslider > li').each(function () {
                    $(this).find('[data-celsius]').each(function () {
                        $(this).text($(this).data($(event.target).data('identifier')));
                    });
                });
                console.timeEnd("Time changing temperature text");
            }
        }
    });

    return DashboardController;
});
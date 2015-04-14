/**
 * Created by Vladyslav_Mykhailenk on 1/6/2015.
 */
define(/*'components/dashboard/dashboard-view', */[
    'vendor',
    'components/dashboard/dashboard-view',
    'components/page/page-controller',
    'utils/gallery/bxslider'
    //'components/models/weather-data-collection'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor, DashboardView, PageController, bxSlider/*, WeatherDataCollection*/) {
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
            //this.tpl = _.template(boardTemplate);
            this.initialize();
            //this.render();
        },
        initialize: function () {
            //this.collectElements();
            this.dashboardView = new DashboardView({ rootHolder: '#container' });
            this.pageController = new PageController();
            //this.weatherDataCollection = new WeatherDataCollection();
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
            //console.log(cityData);
            //var self = this;
            //_(collection).forEach(function(cityData) {
            //    console.log(cityData.cityName.split(','));
            //console.log(this.bxslider.getSlideCount());
            if (modernizr.localstorage) {
                var typeOfDegrees = localStorage['typeOfDegrees'];
            } else {
                typeOfDegrees = $('.degrees.active').data('identifier');
            }
            //console.log(localStorage['typeOfDegrees']);
            var cityNameAttr = this.pageController.pageView.renderSearchResult(cityData, /*$('.degrees.active').data('identifier')*/typeOfDegrees);
            this.pageController.addScrollbarSlider(cityData.cityName.replace(/\s+/g, ''), $('[data-city-name="' + cityNameAttr + '"]'));
            //this.pageController.renderTemperatureRanges();
            var bxslider = this.bxslider;
            if (bxslider.getSlideCount()) {
                var currentSlideIndex = this.bxslider.getCurrentSlide();
                bxslider.reloadSlider(this.reloadOptions(currentSlideIndex));
            } else {
                bxslider.reloadSlider(this.reloadOptions(0));
            }
            this.pageController.renderTemperatureRanges(cityNameAttr);
            //this.bxslider.reloadSlider();
            //});
            //console.log(new WeatherDataCollection());
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
                        //self.bxslider.reloadSlider();
                    });
                    return;
                }
            }

            /*$('.bxslider > li:not(.bx-clone)').each(function() {
                if ($(this).data('city-name') === cityName) {
                    $(this).fadeOut(1000, function() {
                        $(this).remove();
                        self.bxslider.reloadSlider();
                    });
                }
            });*/
        },
        transformDegrees: function(event) {
            //console.log(event.target);
            if (!$(event.target).hasClass('active')) {
                $('.degrees').removeClass('active');
                $(event.target).addClass('active');

                //var self = this;
                //console.log(this);
                console.time("Time changing temperature text");
                /*var dataAttrName = */$('.bxslider > li').each(function () {/*.data('city-name');*/
                    //console.log(dataAttrName);
                    //var $neededSlides = $('[data-city-name="' + dataAttrName + '"]');
                    //console.log($neededSlides.find('[data-celsius]').size());

                    $(this).find('[data-celsius]').each(function () {
                        $(this).text($(this).data($(event.target).data('identifier')));
                    });
                });
                console.timeEnd("Time changing temperature text");
                //$(this).text($(this).data($(event.target).data('identifier')));
                //console.log("Howdy from Dashboard!");
                //console.log($('.bxslider > li.active').data('city-name'));
                //console.log($('.degrees.active').data('identifier'));
                //console.log(this.bxslider.getCurrentSlide());


                //var $activeSlide = $('.bxslider > li.active:not(.bx-clone)'),
                //    currentSlidesCityData = this.weatherDataCollection.getCityData($('.bxslider > li.active').data('city-name')),
                //var typeOfDegrees = $('.degrees.active').data('identifier');

                //var citiesNameAttr = [];
                //$('.bxslider > li:not(.bx-clone)').each(function(index) {
                //    console.log(self.weatherDataCollection.getCityData($(this).data('city-name')).cityName.replace(/\s+/g, ''));
                //    citiesNameAttr.push(self.pageController.pageView.rerenderDegrees($(this), self.weatherDataCollection.getCityData($(this).data('city-name')), typeOfDegrees));
                //    self.pageController.addScrollbarSlider(self.weatherDataCollection.getCityData($(this).data('city-name')).cityName.replace(/\s+/g, ''), $('[data-city-name="' + citiesNameAttr[index] + '"]'));
                //});
                //this.bxslider.speed = 2000;
                //this.bxslider.startSlide = currentSlideIndex;
                /*this.bxslider.reloadSlider({
                    controls: false,
                    //adaptiveHeight: true,
                    slideMargin: 10,
                    startSlide: currentSlideIndex,
                    onSliderLoad: function(currentIndex) {
                        $('.bxslider > li').eq(currentIndex + 1).addClass('active');
                    },
                    onSlideBefore: function($slideElement, oldIndex, newIndex) {
                        $('.bxslider > li').removeClass('active');
                        $('.bxslider > li').eq(newIndex + 1).addClass('active');
                    }
                });*/
                //this.bxslider.goToSlide(currentSlideIndex);
                //this.bxslider.speed = 500;
                //$('.bxslider > li:not(.bx-clone)').each(function(index) {
                //    self.pageController.renderTemperatureRanges(citiesNameAttr[index]);
                //});
                //console.timeEnd("Time changing temperature text");
                //console.log(citiesNameAttr);
            }


        }
    });

    return DashboardController;
});
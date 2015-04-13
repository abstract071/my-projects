/**
 * Created by Vlad on 15.01.2015.
 */
define([
    'vendor',
    'components/page/page-view',
    'utils/sliders/slider.scrollbar',
    'components/models/city-weather',
    'components/models/weather-data-collection'
], function (Vendor, PageView, scrollbarSlider, CityWeather, WeatherDataCollection) {
    'use strict';

    var /*$ = Vendor.$,*/
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        PageController;

    PageController = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            //this.tpl = _.template(searchTemplate);
            //BoardView.prototype = new Vendor.util.EventEmitter();
            this.initialize();
            //this.render();
        },
        initialize: function () {

            //emitter.on('createScrollbarSlider', this.addScrollbarSlider, this);
            this.weatherDataCollection = new WeatherDataCollection();
            this.pageView = new PageView({ rootHolder: '.bxslider' });
            emitter.on('renderTemperatureRanges', this.renderTemperatureRanges, this);

        },
        addScrollbarSlider: function() {
            //$('.weather-slider').each(function(index) {
            //console.log($('.bxslider > li').size());

            var index = $('.weather-slider').size();
            //console.log($('.weather-slider').eq(index - 2));
            scrollbarSlider('.scrollSlider' + index, $('.weather-slider').eq(index - 1));
            //});
        },
        renderTemperatureRanges: function(cityNameAttr) {
            console.log('\n\n');
            //console.log($(pageTempTpl).find('.box-range span'));
            //console.log($('[data-city-name="' + cityNameAttr + '"]:not(.bx-clone)'));
            var $currentLi = $('[data-city-name="' + cityNameAttr + '"]:not(.bx-clone)');
            var contWidth = $currentLi.find('.box-range').width();
            //console.log(contWidth);
            //$('.bottom-temp').text();
            //var elWidth = $('.box-range span').data('range');
            //$("#container").append('<span>' + $('.box-range span').data('range') + '</span>');

            var arrMins = [],
                arrMaxs = [],
            //arrRangesWidth = [],
                fullWidths = [],
                arrEdges = [];

            var $range = $currentLi.find('.box-range span');
            $range.each(function() {
                //arrRangesWidth.push($(this).data('max') - $(this).data('min'));
                arrMins.push($(this).parent().parent().find('.bottom-temp').text());
                arrMaxs.push($(this).parent().parent().find('.top-temp').text());
            });
            //var maxWidth = Math.max.apply(undefined, arrRangesWidth);
            var minEdge = Math.min.apply(undefined, arrMins);
            var maxEdge = Math.max.apply(undefined, arrMaxs);
            var maxRange = maxEdge - minEdge;
            //console.log('Max width for range: ' + maxRange);
            console.log('Mins array: ' + arrMins);
            //console.log('Global min: ' + minEdge);
            console.log('Maxs array: ' + arrMaxs);
            //console.log('Global max: ' + maxEdge);


            $range.width(function(index) {
                //console.log('difference: ' + ($(this).data('max') - $(this).data('min')));
                //console.log('max: ' + $(this).data('max'));
                //console.log('min: ' + $(this).data('min'));
                //console.log('Index: ' + index);

                var elWidth = $currentLi.find('.top-temp').eq(index).text() - $currentLi.find('.bottom-temp').eq(index).text();
                //$(this).data('range', elWidth);
                //console.log((elWidth/maxRange)*contWidth);
                return ((elWidth/maxRange)*contWidth);
            });

            $range.each(function(index) {
                var offset = (($currentLi.find('.bottom-temp').eq(index).text() - minEdge)/maxRange)*contWidth;
                //console.log($(this).data('range'));
                //console.log($(this).data('min'));
                //console.log(minEdge);
                //console.log(offset);
                //console.log($(this).data('min') - minEdge);
                $(this).css('margin-left', offset);
                fullWidths.push(parseFloat($(this).css('margin-left')) + $(this).width());

            });
            //console.log($('.box-range').width());
            console.log('Full max width: ' + Math.max.apply(undefined, fullWidths));
            //$(".box-range").width(curWidth/maxRange)*contWidth;
        }

    });

    return PageController;
});
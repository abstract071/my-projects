/**
 * Created by Vlad on 15.01.2015.
 */
define([
    'vendor',
    'components/page/page-view',
    'utils/sliders/slider.scrollbar',
    /*'components/models/city-weather',
    'components/models/weather-data-collection'*/
], function (Vendor, PageView, scrollbarSlider/*, CityWeather, WeatherDataCollection*/) {
    'use strict';

    var $ = Vendor.$,
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
            //this.weatherDataCollection = new WeatherDataCollection();
            this.pageView = new PageView({ rootHolder: '.bxslider' });
            emitter.on('renderTemperatureRanges', this.renderTemperatureRanges, this);

        },
        addScrollbarSlider: function(id, element) {
            //$('.weather-slider').each(function(index) {
            //console.log($('.bxslider > li').size());
            //console.log(id);
            //console.log(element.find('.weather-slider'));

            //var index = $('.weather-slider').size();
            //console.log($('.weather-slider').eq(index - 2));
            scrollbarSlider(/*'scrollSlider' +*/ id, element.find('.weather-slider')/*$('.weather-slider').eq(index - 1)*/);
            //});
        },
        renderTemperatureRanges: function(cityNameAttr) {
            /*console.log('\n\n');
            var $currentLi = $('[data-city-name="' + cityNameAttr + '"]:not(.bx-clone)');
            var contWidth = $currentLi.find('.box-range').width();

            var arrMins = [],
                arrMaxs = [],
                fullWidths = [];

            var $range = $currentLi.find('.box-range span');
            $range.each(function() {
                arrMins.push($(this).parent().parent().find('.bottom-temp').text());
                arrMaxs.push($(this).parent().parent().find('.top-temp').text());
            });
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
                return ((((elWidth/maxRange)*contWidth)/contWidth)*100) + '%';
            });

            $range.each(function(index) {
                var offset = (($currentLi.find('.bottom-temp').eq(index).text() - minEdge)/maxRange)*contWidth;
                $(this).css('margin-left', ((offset/contWidth)*100) + '%');
                fullWidths.push(parseFloat($(this).css('margin-left')) + $(this).width());

            });
            console.log('Full max width: ' + Math.max.apply(undefined, fullWidths));
            //$(".box-range").width(curWidth/maxRange)*contWidth;*/


            //console.log('\n\n');
            var $currentLi = $('[data-city-name="' + cityNameAttr + '"]:not(.bx-clone)');
            //var contWidth = $currentLi.find('.temp-range').width();

            var arrMins = [],
                arrMaxs = [],
                fullWidths = [];

            var $range = $currentLi.find('.temp-range');

            //Define min and max temperature for each day
            $range.each(function() {
                arrMins.push($(this).find('.bottom-temp').text());
                arrMaxs.push($(this).find('.top-temp').text());
            });
            var minEdge = Math.min.apply(undefined, arrMins);
            var maxEdge = Math.max.apply(undefined, arrMaxs);
            var maxRange = maxEdge - minEdge;
            //console.log('Mins array: ' + arrMins);
            //console.log('Maxs array: ' + arrMaxs);

            //Set corresponding width for white range
            $range.find('.range').width(function(index) {
                var elWidth = arrMaxs[index] - arrMins[index];
                return (elWidth/maxRange*70) + '%';
            });

            //Set corresponding offset
            $range.find('.bottom-temp').each(function(index) {
                var offset = ((arrMins[index] - minEdge)/maxRange)*70;
                $(this).css('margin-left', offset + '%');
                fullWidths.push(parseFloat($(this).css('margin-left')) + $(this).width());

            });
            //console.log('Full max width: ' + Math.max.apply(undefined, fullWidths));


        }

    });

    return PageController;
});
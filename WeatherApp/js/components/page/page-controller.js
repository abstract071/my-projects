/**
 * Created by Vlad on 15.01.2015.
 */
define([
    'vendor',
    'components/page/page-view',
    'utils/sliders/slider.scrollbar'
], function (Vendor, PageView, scrollbarSlider) {
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
            this.initialize();
        },
        initialize: function () {

            this.pageView = new PageView({ rootHolder: '.bxslider' });
            emitter.on('renderTemperatureRanges', this.renderTemperatureRanges, this);

        },
        addScrollbarSlider: function(id, element) {
            scrollbarSlider(id, element.find('.weather-slider'));
        },
        renderTemperatureRanges: function(cityNameAttr) {
            var $currentLi = $('[data-city-name="' + cityNameAttr + '"]:not(.bx-clone)');

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
/**
 * Created by Vlad on 15.01.2015.
 */
define(/*'components/dashboard/dashboard-view', */[
    'vendor',
    'text!components/page/page.tpl',
    'utils/sliders/slider.scrollbar'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor, pageTemplate, scrollbarSlider) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        PageView;

    PageView = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            this.tpl = _.template(pageTemplate);
            this.initialize();
            //this.render();
            //this.createScrollbarSlider();
            //scrollbarSlider();
        },

        initialize: function () {
            this.collectElements();
        },
        collectElements: function () {
            this.$holder = $(this.options.rootHolder);
        },
        //render: function (){
            //console.log(pageTemplate);
            //this.$holder.append(this.tpl());
        //},
        renderSearchResult: function (cityData, typeOfDegrees){
            //console.log(cityData);
            //console.log(typeOfDegrees);
            //console.time("Template timing");
            var pageTpl = this.tpl({ cityData: cityData, typeOfDegrees: typeOfDegrees });
            //console.timeEnd("Template timing");
            //console.log(pageTpl);
            this.$holder.append(pageTpl);
            //console.log($(pageTpl).data('city-name'));
            return $(pageTpl).data('city-name');
        },
        /*rerenderDegrees: function($activeSlide, cityData, typeOfDegrees) {
            console.time("Template timing");
            var pageTpl = this.tpl({ cityData: cityData, typeOfDegrees: typeOfDegrees });
            console.timeEnd("Template timing");
            //console.log($(pageTpl).addClass('active'));
            $activeSlide.replaceWith($(pageTpl).addClass('active'));
            //console.log($(pageTpl).get());
            //console.log($(pageTpl).data('city-name'));
            return $(pageTpl).data('city-name');
        },*/
        removeSlides: function(cityName) {
            emitter.trigger('removeSlides', cityName);
        },
        renderTemperatureRanges: function() {
            emitter.trigger('renderTemperatureRanges');
        }

    });


    return PageView;
});
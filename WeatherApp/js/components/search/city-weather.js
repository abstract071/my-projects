/**
 * Created by Vlad on 28.01.2015.
 */
define(['vendor'], function (Vendor) {
    'use strict';

    var _ = Vendor._,
        Class = Vendor.util.Class,
        CityWeather;

    CityWeather = Class.extend({
        //defaultOptions: {
        //
        //},
        constructor: function (options) {
            _.assign(this, options);
            this.initialize();
        },
        initialize: function () {
        },
        convertToCelsius: function(fahrenheits) {
            return Math.round((fahrenheits - 32)/1.8);
        }
        //collectElements: function () {
        //    this.$holder = $(this.options.rootHolder);
        //    this.$setBoard = $(this.tpl());
        //},
        //render: function (){
        //    this.$holder.append(this.tpl());
        //}
    });

    return CityWeather;
});
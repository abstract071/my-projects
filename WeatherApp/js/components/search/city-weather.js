/**
 * Created by Vlad on 28.01.2015.
 */
define(['vendor'], function (Vendor) {
    'use strict';

    var /*$ = Vendor.$,*/
        _ = Vendor._,
        Class = Vendor.util.Class,
        CityWeather;

    CityWeather = Class.extend({
        //defaultOptions: {
        //
        //},
        constructor: function (options) {
            _.assign(this, options);
            //this.tpl = _.template(searchTemplate);
            //BoardView.prototype = new Vendor.util.EventEmitter();
            this.initialize();
            //this.render();
        },
        initialize: function () {
            //this.searchView = new SearchView({ rootHolder: '#wrapper' });
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

    //console.log();

    return CityWeather;
});
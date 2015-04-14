/**
 * Created by Vladyslav_Mykhailenk on 1/6/2015.
 */
define([
    'vendor',
    'components/settings/settings-view'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor, SettingsView) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        SettingsController;

    SettingsController = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            //this.tpl = _.template(settingsTemplate);
            //BoardView.prototype = new Vendor.util.EventEmitter();
            this.initialize();
            //this.render();
        },
        initialize: function () {
            this.settingsView = new SettingsView({ rootHolder: '.sidebar' });
            //emitter.on('transformDegrees', this.transformDegrees, this);
        }
        /*transformDegrees: function(event) {
            //console.log(event.target);
            if (!$(event.target).hasClass('active')) {
                $('.degrees').removeClass('active');
                $(event.target).addClass('active');


                var dataAttrName = $('.bxslider > li.active').data('city-name');
                console.log(dataAttrName);
                var $neededSlides = $('[data-city-name="' + dataAttrName + '"]');
                console.log($neededSlides.find('[data-celsius]').size());
                console.time("Time changing temperature text");
                $neededSlides.find('[data-celsius]').each(function() {
                    $(this).text($(this).data($(event.target).data('identifier')));
                });
                console.timeEnd("Time changing temperature text");
            }


        }*/
        //collectElements: function () {
        //    this.$holder = $(this.options.rootHolder);
        //    this.$setBoard = $(this.tpl());
        //},
        //render: function (){
        //    this.$holder.append(this.tpl());
        //}
    });

    return SettingsController;
});
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

    var /*$ = Vendor.$,*/
        _ = Vendor._,
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
        }
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
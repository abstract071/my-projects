define([
    'vendor',
    'text!components/dashboard/dashboard.tpl',
    'utils/gallery/jquery.bxslider.min'
], function (Vendor, dashboardTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class = Vendor.util.Class,
        DashboardView;

    DashboardView = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            this.tpl = _.template(dashboardTemplate);
            this.initialize();
            this.render();
        },
        initialize: function () {
            this.collectElements();
        },
        collectElements: function () {
            this.$holder = $(this.options.rootHolder);
        },
        render: function (){
            this.$holder.append(this.tpl());
        }
    });


    return DashboardView;
});
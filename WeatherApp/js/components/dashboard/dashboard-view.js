define(/*'components/dashboard/dashboard-view', */[
    'vendor',
    'text!components/dashboard/dashboard.tpl',
    //'utils/gallery/bxslider',
    //'utils/sliders/slider.scrollbar',
    'utils/gallery/jquery.bxslider.min'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor, dashboardTemplate/*, bxSlider, scrollbarSlider*/) {
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
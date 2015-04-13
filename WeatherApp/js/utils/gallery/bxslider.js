/**
 * Created by Vlad on 15.01.2015.
 */
define([
    'vendor'
], function(Vendor) {
    'use strict';

    var $ = Vendor.$;

    var bxSlider = function () {
         return $('.bxslider').bxSlider({
                controls: false,
                slideMargin: 10
                //onSliderLoad: function(currentIndex) {
                //    $('.bxslider > li').eq(currentIndex + 1).addClass('active');
                //},
                //onSlideBefore: function($slideElement, oldIndex, newIndex) {
                //    $('.bxslider > li').eq(oldIndex + 1).removeClass('active');
                //    $('.bxslider > li').eq(newIndex + 1).addClass('active');
                //}
            });
    };

    return bxSlider;
});


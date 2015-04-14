/**
 * Created by Vlad on 15.01.2015.
 */
define([
    'vendor'
], function(Vendor) {
    'use strict';

    var $ = Vendor.$;

    var bxSlider = function (slideIndex) {
         return $('.bxslider').bxSlider({
                controls: false,
                slideMargin: 10,
                //adaptiveHeight: true,
                //startSlide: this.getCurrentSlide() || 0,
                onSliderLoad: function(currentIndex) {
                    $('.bxslider > li').eq(currentIndex + 1).addClass('active');
                },
                onSlideBefore: function($slideElement, oldIndex, newIndex) {
                    $('.bxslider > li').removeClass('active');
                    $('.bxslider > li').eq(newIndex + 1).addClass('active');
                }
            });
    };

    return bxSlider;
});


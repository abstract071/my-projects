/**
 * Created by Vlad on 15.01.2015.
 */
define([
    'vendor'
], function(Vendor) {
    'use strict';

    var $ = Vendor.$;

    var scrollbarSlider = function (cl, el) {
                //scrollpane parts
                //console.log(cl);

                //$(el).find(".scroll-pane").addClass(cl);
                //$(el).find(".scroll-content").addClass(cl);
                var scrollPane = $(el).find(".scroll-pane").addClass(cl),
                    scrollContent = $(el).find(".scroll-content").addClass(cl);

                //build slider
                var scrollbar = $(el).find(".scroll-bar").addClass(cl).slider({
                    slide: function (event, ui) {
                        if (scrollContent.width() > scrollPane.width()) {
                            scrollContent.css("margin-left", Math.round(
                                ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
                            ) + "px");
                        } else {
                            scrollContent.css("margin-left", 0);
                        }
                    }
                });

                scrollbar.bind('touchstart', function(event){
                    event.stopPropagation();
                });

                //append icon to handle
                var handleHelper = scrollbar.find(".ui-slider-handle")
                    .mousedown(function () {
                        scrollbar.width(handleHelper.width());
                    })
                    .mouseup(function () {
                        scrollbar.width("100%");
                    })
                    .append("<span class='ui-icon ui-icon-grip-dotted-vertical'></span>")
                    .wrap("<div class='ui-handle-helper-parent'></div>").parent();

                //change overflow to hidden now that slider handles the scrolling
                scrollPane.css("overflow", "hidden");

                //size scrollbar and handle proportionally to scroll distance
                function sizeScrollbar() {
                    var remainder = scrollContent.width() - scrollPane.width();
                    var proportion = remainder / scrollContent.width();
                    var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
                    scrollbar.find(".ui-slider-handle").css({
                        width: handleSize,
                        "margin-left": -handleSize / 2
                    });
                    handleHelper.width("").width(scrollbar.width() - handleSize);
                }

                //reset slider value based on scroll content position
                function resetValue() {
                    var remainder = scrollPane.width() - scrollContent.width();
                    var leftVal = scrollContent.css("margin-left") === "auto" ? 0 :
                        parseInt(scrollContent.css("margin-left"));
                    var percentage = Math.round(leftVal / remainder * 100);
                    scrollbar.slider("value", percentage);
                }

                //if the slider is 100% and window gets larger, reveal content
                function reflowContent() {
                    var showing = scrollContent.width() + parseInt(scrollContent.css("margin-left"), 10);
                    var gap = scrollPane.width() - showing;
                    if (gap > 0) {
                        scrollContent.css("margin-left", parseInt(scrollContent.css("margin-left"), 10) + gap);
                    }
                }

                //change handle position on window resize
                $(window).resize(function () {
                    scrollbar.width(scrollPane.width());
                    resetValue();
                    sizeScrollbar();
                    reflowContent();
                    //scrollbar.width(scrollPane.width());
                });
                //init scrollbar size
                setTimeout(sizeScrollbar, 10);//safari wants a timeout
            //};

            //console.log(scrollSlider);
            //scrollSlider('.some1');
            //scrollSlider('.some2');

    };

    return scrollbarSlider;
});
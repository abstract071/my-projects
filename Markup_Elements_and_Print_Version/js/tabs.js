/**
 * Created by Vlad on 16.05.2015.
 */
$(function() {
    $('.tabs-holder .tabset a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');

        // Show/Hide Tabs
        console.log($('.tabs-holder ' + currentAttrValue).siblings());
        $('.tabs-holder ' + currentAttrValue).addClass('active').siblings().removeClass('active');

        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
});
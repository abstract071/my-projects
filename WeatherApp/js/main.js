require.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'jquery': 'libs/jquery-2.1.3.min',
        'jqueryui': 'libs/jquery-ui',
        'jquerytouchpunch': 'libs/jquery.ui.touch-punch.min',
        'lodash': 'libs/lodash.min',
        'text': 'libs/text',
        'geoservice': 'services/google.maps.service',
        'forecastioservice': 'services/forecastio.service',
        'modernizr': 'libs/modernizr.min'
    },
    shim: {
        'jqueryui': {
            deps: ['jquery']
        },
        'jquerytouchpunch': {
            deps: ['jquery',
                   'jqueryui']
        },
        'utils/gallery/jquery.bxslider.min': {
            deps: ['jquery',
                   'jqueryui']
        },
        'utils/sliders/slider.scrollbar': {
            deps: ['jquery',
                   'jqueryui']
        },
        'utils/gallery/bxslider': {
            deps: ['utils/gallery/jquery.bxslider.min']
        },
        'components/dashboard/dashboard-view': {
            deps: ['utils/gallery/jquery.bxslider.min']
        },
        'app/app': {
            deps: ['components/dashboard/dashboard-view']
        }
    },
    packages: [ 'vendor' ]
});

// Start the main app logic.
//requirejs(['jquery', 'canvas', 'app/sub'],
//    function   ($,        canvas,   sub) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
    //});
require(['vendor',
         'app/app',
         //'text!components/page/page.tpl',
         'jquerytouchpunch'
    ], function(Vendor, App) {

    'use strict';

    Vendor.$(function() {
        new App();
    });

});
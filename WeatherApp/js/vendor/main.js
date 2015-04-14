/**
 * Created by Vladyslav_Mykhailenk on 12/25/2014.
 */
define('vendor', [
    'vendor/core',
    'utils/util'
], function(core, util) {
    'use strict';

    //debugger;
    return {
        '$': core.$,
        '_': core._,
        'Modernizr': core.Modernizr,
        'util': util
    };
});
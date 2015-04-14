/**
 * Created by Vlad on 04.01.2015.
 */
define([
    'vendor',
    /*'components/models/weather-data-collection',*/
    'text!components/search/search.tpl',
    'text!components/search/search-result.tpl'
    //'utils/gallery/jquery.bxslider.min',
    //'text!utils/gallery/jquery.bxslider.css'
], function (Vendor/*, weatherDataCollection*/, searchWrapperTemplate, searchResultTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        emitter = Vendor.util.EventEmitter,
        Class = Vendor.util.Class,
        SearchView;

    SearchView = Class.extend({
        defaultOptions: {

        },
        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            this.wrapperTpl = _.template(searchWrapperTemplate);
            this.searchResultTpl = _.template(searchResultTemplate);
            //BoardView.prototype = new Vendor.util.EventEmitter();
            this.initialize();
            this.render();
            this.addEventListeners();
        },
        initialize: function () {
            this.collectElements();
        },
        collectElements: function () {
            this.$holder = $(this.options.rootHolder);
            //this.$searchResultHolder = $(this.options.rootSearchResultHolder);
            //this.$setBoard = $(this.tpl());
        },
        render: function (){
            this.$holder.append(this.wrapperTpl());
            this.$searchResultHolder = this.$holder.find(this.options.rootSearchResultHolder);
            //this.renderSearchResult({ cityName: '' });
        },
        renderSearchResult: function (cityElement, isChecked){

            this.$searchResultHolder.append(this.searchResultTpl({ cityElement: cityElement, isChecked: isChecked }));
        },
        emptySearchResult: function () {
            this.$searchResultHolder.empty();
        },
        addEventListeners: function() {
            //this.$holder.find('.icon-add').on('click', function(e) {
            //    emitter.trigger('click', 'by me', 10, 'times');
            //});
            $('input[name=cityname]').on('input', function() {
                emitter.trigger('searchStateHasChanged');
            });
            $('.icon-add').on('click', function() {
                emitter.trigger('addCityToCollection');
            });
        }
    });

    return SearchView;
});
/**
 * Created by Vlad on 04.01.2015.
 */
define([
    'vendor',
    'text!components/search/search.tpl',
    'text!components/search/search-result.tpl'
], function (Vendor, searchWrapperTemplate, searchResultTemplate) {
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
            this.initialize();
            this.render();
            this.addEventListeners();
        },
        initialize: function () {
            this.collectElements();
        },
        collectElements: function () {
            this.$holder = $(this.options.rootHolder);
        },
        render: function (){
            this.$holder.append(this.wrapperTpl());
            this.$searchResultHolder = this.$holder.find(this.options.rootSearchResultHolder);
        },
        renderSearchResult: function (cityElement, isChecked){

            this.$searchResultHolder.append(this.searchResultTpl({ cityElement: cityElement, isChecked: isChecked }));
        },
        emptySearchResult: function () {
            this.$searchResultHolder.empty();
        },
        addEventListeners: function() {
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
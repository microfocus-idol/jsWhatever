/**
 * @module navigation
 * @desc Wrapper around a Bootstrap navbar to handle updating the active link
 * @extends Backbone.View
 */
define([
    'backbone',
    'text!js-utils/templates/navigation.html'
], function(Backbone, template) {

    return Backbone.View.extend({
        /**
         * @desc Returns parameters which are passed to the template. Defaults to a no-op
         * @method
         * @abstract
         */
        getTemplateParameters: $.noop,

        /**
         * @desc Template for the navbar
         */
        template: _.template(template, undefined, {variable: 'ctx'}),

        /**
         * @typedef NavigationOptions
         * @property {string} event This event is observed on the router to respond to navigation changes
         * @property {Backbone.Router} router The router to observe for navigation events
         * @property {AbstractPages} pages Instance of {@link module:abstract-pages|AbstractPages}
         */
        /**
         * @desc Backbone initialize method
         * @param {NavigationOptions} options
         */
        initialize: function(options) {
            _.bindAll(this, 'navigate');

            if (!this.event || !this.router) {
                throw 'navigation.js error: event and router must be provided!';
            }

            this.pages = options.pages;
            this.router.on(this.event, this.navigate);
        },

        /**
         * @desc Updates the active link on the navbar. Called when the given router fires the given event
         * @param pageName The name of the page that has been navigated to
         */
        navigate: function(pageName) {
            this.$('li').removeClass('active');
            var clicked = this.$('li[data-pagename="' + pageName + '"]');
            clicked.addClass('active');
            clicked.closest('.dropdown').addClass('active');
        },

        /**
         * @desc Renders the navbar
         */
        render: function() {
            var params = this.getTemplateParameters();

            this.$el.html(this.template(params));

            this.$('li').click(_.bind(function(e) {
                if (e.which !== 2) {
                    var target = $(e.delegateTarget);
                    var route = target.data('pagename');

                    if (route) {
                        e.preventDefault();
                        this.navigate(route);
                        this.pages.navigateToPage(route);
                    }
                }
            }, this));
        }
    });

});
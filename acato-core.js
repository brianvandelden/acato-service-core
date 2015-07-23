angular.module('acato.service.core', [])

/**
 * A core acato app provider.
 *
 * Usage:
 * angular.module('myApp', ['ionic', 'tofu'])
 * .config(['$acatoApp', function() {
 *   $acatoAppProvider.init({
 *     api_version: 'v1'
 *   });
 * }]);
 */
    .provider('$acatoApp', ['$httpProvider', function($httpProvider) {
        var app = {};

        var settings = {
            'api_server': 'http://ionic.app'
        };

        this.init = function(opts) {
            if (!opts.gcm_id){
                opts.gcm_id = 'None';
            }
            app = opts;
        };

        /**
         * Set a config property.
         */
        this.set = function(k, v) {
            settings[k] = v;
        };

        this.setApiServer = function(server) {
            settings.api_server = server;
        };

        this.$get = [function() {
            return {
                getValue: function(k) {
                    return settings[k];
                },
                getApiUrl: function() {
                    return this.getValue('api_server');
                },
                getApiEndpoint: function(service) {
                    var app = this.getApp();
                    if(!app) return null;

                    return this.getApiUrl() + '/api/v1/' + service;
                },

                /**
                 * Get the registered app for all commands.
                 */
                getApp: function() {
                    return app;
                }

            }
        }];
    }]);
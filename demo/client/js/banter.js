(function($w, $j) {

    // Initialise the Banter.js application, baby!
    $w.banterApp = angular.module('banterApp', []);

    /**
     * @factory $logger
     * @type {Function}
     * Responsible for logging items to the console for debugging purposes, which is especially
     * useful for when developers extend/modify Banter.js.
     * @return {Object}
     */
    banterApp.factory('$logger', function($rootScope) {

        var service = {};

        /**
         * @method log
         * Wrapper for console.log.
         */
        service.log = function log(message) {
            console.log('Banter.js @ ' + moment().format('HH:mm:ss') + ' - ' + message);
        };

        /**
         * @method error
         * Wrapper for console.error.
         */
        service.error = function log(message) {
            console.error('Banter.js @ ' + moment().format('HH:mm:ss') + ' - ' + message);
        };

        return service;

    });

    /**
     * @factory $webSocket
     * @type {Function}
     * WebSocket adapter for communicating with the Ruby Em-WebSocket server. Listens
     * for messages, sends messages, emits events when certain events happen on the server.
     * @return {Object}
     */
    banterApp.factory('$webSocket', function($rootScope, $logger) {

        var service = {};

        /**
         * @property webSocket
         * @type {Object}
         */
        $rootScope.webSocket = {};

        /**
         * @method connect
         * @param url {String}
         * @return {void}
         */
        service.connect = function connect(url) {

            var ws;

            // Initialise the WebSocket and connect to the Ruby server.
            $rootScope.webSocket = ws = new WebSocket(url);

            /**
             * @method onopen
             * @broadcasts connected
             * @return {void}
             */
            ws.onopen = function onopen() {
                $logger.log('Banter.js Connected, Sugar!');
                ws.send('Server: Client Connected at ' + moment().format('HH:mm:ss'));
                $rootScope.$broadcast('connected');
            };

            /**
             * @method onerror
             * @return {void}
             */
            ws.onerror = function onerror() {
                $logger.error('Client Threw an Error, Petal!');
            };

            /**
             * @method onmessage
             * @param messageEvent {MessageEvent}
             * @broadcasts receivedMessage
             * @return {void}
             */
            ws.onmessage = function onmessage(messageEvent) {
                $logger.log('Message Received (' + messageEvent.data.length + ' Characters), Sweetie...');
                $rootScope.$broadcast('receivedMessage', messageEvent);
            }

        };

        /**
         * @event sendMessage
         * @param event {Object}
         * @param data {Object}
         * Invoked when the customer sends a message to the server.
         * @return {void}
         */
        $rootScope.$on('sendMessage', function sendMessage(event, data) {

            var json = JSON.stringify(data);

            $logger.log('Message Sent (' + json.length + ' Characters), Cherry...');

            // Send the message to the Ruby server!
            $rootScope.webSocket.send(json);

        });

        return service;

    });

    /**
     * @controller ApplicationController
     * @type {Function}
     */
    banterApp.controller('ApplicationController',
    ['$scope', '$webSocket', '$logger', function ApplicationController($scope, $webSocket, $logger) {

        /**
         * @property connected
         * @type {Boolean}
         * @default false
         */
        $scope.connected = false;

        /**
         * @property messages
         * @type {Array}
         * @default []
         */
        $scope.messages = [];

        /**
         * @property message
         * @type {String}
         * @default ''
         */
        $scope.message = '';

        /**
         * @event bootstrap
         * @param event {Object}
         * @param url {String}
         * Bootstrap the Banter.js client!
         * @return {void}
         */
        $scope.$on('bootstrap', function bootstrap(event, url) {

            $logger.log('Client Connecting: ' + url);

            // Connect to the Ruby WebSocket server.
            $webSocket.connect('ws://localhost:8080');

        });

        /**
         * @event connected
         * Connect the client to the server.
         * @return {void}
         */
        $scope.$on('connected', function connected() {

            $scope.connected = true;
            $scope.$apply();

        });

        /**
         * @event receivedMessage
         * @param event {Object}
         * @param messageEvent {Object}
         * When the client receives a message from the server.
         * @return {Boolean}
         */
        $scope.$on('receivedMessage', function receivedMessage(event, messageEvent) {

            if (typeof $j === 'undefined') {
                // We don't have jQuery so unfortunately we can't decode the JSON.
                console.error('Please install jQuery to continue using Banter.js.');
                return false;
            }

            // We've received a message, so we'll push it into the collection
            // of messages!
            $scope.messages.push($.parseJSON(messageEvent.data));
            $scope.$apply();
            return true;

        });

        /**
         * @method sendMessage
         * @param message {String}
         * @emits sendMessage
         * @return {void}
         */
        $scope.sendMessage = function sendMessage(message) {
            $scope.$emit('sendMessage', { name: 'Wildhoney', message: message });
            // Send the message to the awaiting WebSocket server!
        }

    }]);

    /**
     * @directive websocketServer
     * @restrict A
     * @type {Function}
     * Extracts the WebSocket URL from the root element. Once the URL has been determined
     * we can bootstrap the application.
     * @return {Object}
     */
    banterApp.directive('banter', ['$rootScope', function websocketServer($rootScope) {

        return { restrict: 'C', link: function linkFn($attrs) {

            // Find the URL from the attribute, otherwise assume the default.
            var url = (typeof $attrs.websocketServer !== 'undefined')
                    ? $attrs.websocketServer : 'ws://localhost:8080';

            // Let everybody know we found the WebSocket URL!
            $rootScope.$broadcast('bootstrap', url);

        }};

    }]);

})(window, jQuery);
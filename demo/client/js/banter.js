(function($w, $j) {

    // Initialise the Banter.js application, baby!
    $w.banterApp = angular.module('banterApp', []);

    /**
     * @factory $webSocket
     * @type {Function}
     * WebSocket adapter for communicating with the Ruby Em-WebSocket server. Listens
     * for messages, sends messages, emits events when certain events happen on the server.
     * @return {Object}
     */
    banterApp.factory('$webSocket', function($rootScope) {

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
            $rootScope.webSocket = ws = new WebSocket('ws://localhost:8080');

            /**
             * @method onopen
             * @broadcasts connected
             * @return {void}
             */
            ws.onopen = function onopen() {
                ws.send('Banter.js Client Connected, Sugar!');
                $rootScope.$broadcast('connected');
            };

            /**
             * @method onmessage
             * @param messageEvent {MessageEvent}
             * @broadcasts receivedMessage
             * @return {void}
             */
            ws.onmessage = function onmessage(messageEvent) {
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
            // Send the message to the Ruby server!
            $rootScope.webSocket.send(JSON.stringify(data));
        });

        return service;

    });

    /**
     * @controller ApplicationController
     * @type {Function}
     */
    banterApp.controller('ApplicationController',
    ['$scope', '$webSocket', function ApplicationController($scope, $webSocket) {

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

        // Connect to the Ruby WebSocket server.
        $webSocket.connect('ws://localhost:8080');

        /**
         * @event connected
         * Bootstrap the Banter.js client!
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

})(window, jQuery);
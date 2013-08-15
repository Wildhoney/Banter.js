window.banterApp = angular.module('banterApp', []);

/**
 * @controller ApplicationController
 * @param $scope {Object}
 * @constructor
 */
function ApplicationController($scope) {

    var socket = new WebSocket('ws://localhost:8080');
    $scope.messages = [];

    socket.onopen = function(event) {
        socket.send('Test baby');
        $scope.connected = true;
        $scope.$apply();
    };

    socket.onmessage = function(event) {

        if (typeof $ === 'undefined') {
            console.error('Please install jQuery to continue using Banter.js.');
            return;
        }

        $scope.messages.push($.parseJSON(event.data));
        $scope.$apply();
    };

    /**
     * @property message
     * @type {String}
     */
    $scope.message = '';

    /**
     * @method sendMessage
     * @param message {String}
     * @return {Boolean}
     */
    $scope.sendMessage = function sendMessage(message) {

        // Send the message to the awaiting WebSocket server!
        return socket.send(JSON.stringify({
            name: 'Wildhoney',
            message: message }
        ));

    }

}
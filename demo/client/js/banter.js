window.banterApp = angular.module('banterApp', []);

/**
 * @controller ApplicationController
 * @param $scope {Object}
 * @constructor
 */
function ApplicationController($scope) {

    var socket = new WebSocket('ws://localhost:8080');

    socket.onopen = function(event) {
        socket.send('Test baby');
        $scope.connected = true;
        $scope.$apply();
    };

    socket.onmessage = function(event) {
        console.log(event.data);
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
describe('Test', function() {

    beforeEach(module('banterApp'));

    var $messagesController, scope, rootScope;

    beforeEach(inject(function($controller, $rootScope) {

        rootScope   = $rootScope;
        scope       = $rootScope.$new();

        $messagesController = $controller('MessagesController', {
            $scope: scope
        });

    }));

    it('Can setup the controller;', function() {

        // Member variables are defined.
        expect(scope.message).toBeDefined();
        expect(scope.messages).toBeDefined();
        expect(scope.messages.length).toEqual(0);
        expect(scope.gravatar).toBeDefined();

        // Controllers are defined.
        expect(scope.sendMessage).toBeDefined();
        expect(typeof scope.sendMessage).toEqual('function');

    });

    it('Can respond to the `receivedMessage` broadcast;', function() {

        // Can receive a message.
        rootScope.$broadcast('receivedMessage', {
            name: 'Adam',
            message: 'We are testing...'
        });
        expect(scope.messages.length).toEqual(1);
        expect(scope.messages[0].name).toEqual('Adam');

    });

    it('Can respond to the `receivedCommand` broadcast;', function() {

        // Can receive a message.
        rootScope.$broadcast('receivedCommand', {
            connected: true
        });
        expect(scope.connected).toEqual(true);

    });

});
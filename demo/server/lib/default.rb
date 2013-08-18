module Banter

  class Base

    @bot
    @channel

    #method connect
    #param name {String}
    #param server {String}
    #param channel {String}
    #param port {Number}
    #constructor
    def connect(name, server, channel, port)

      deferred = EM::Q.defer
      @channel = channel

      irc = Net::YAIL.new(
          :address    => 'irc.freenode.net',
          :port       => 6667,
          :username   => 'Banter-Adam',
          :realname   => 'Adam Timberlake',
          :nicknames  => ['Banter-Adam2', 'Banter-Adam3', 'Banter-Adam4']
      )

      irc.on_welcome proc { |event|
        print 'Well...'
        irc.join('#banter-test')
        deferred.resolve('Connected')
      }

      deferred.promise

    end

    #method send_message
    #return {Boolean}
    def send_message(message)
      @bot.send_message(@channel, message)
    end

  end

end
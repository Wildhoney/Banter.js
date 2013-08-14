module Banter

  class Base

    @bot
    @channel

    #method initialize
    #param name {String}
    #constructor
    def initialize(name, server, channel, port)

      @channel = channel

      # Instantiate the IRC class passing in the params.
      @bot = IRC.new(name, server, port, 'Banter.js Client')

      # Add a callback for when the MotD has been displayed -- we'll then join the channel specified.
      IRCEvent.add_callback('endofmotd') { |event| @bot.add_channel('#'.concat(channel)) }

      # Finally we connect to the IRC server!
      @bot.connect

    end

    #method send_message
    #return {Boolean}
    def send_message(message)
      @bot.send_message(@channel, message)
    end

  end

end
class Banter
  
  @irc
  @channel

  attr_reader :irc

  #method connect
  #param name {String}
  #param server {String}
  #param channel {String}
  #param port {Number}
  #constructor
  def connect(name, server, port, channel)

    deferred = EM::Q.defer
    
    @channel = channel
    
    @irc = Ponder::Thaum.new do |config|
      config.nick   = name
      config.server = server
      config.port   = port
    end

    @irc.on :connect do
      @irc.join channel
      deferred.resolve('Connected')
    end

    @irc.connect

    deferred.promise

  end

  #method send_message
  #return {Boolean}
  def send_message(message)
    @irc.message(@channel, message)
  end

end
# Update our $LOAD_PATH to include Ruby-IRC and Em-Websocket.
$:.unshift File.dirname(__FILE__).concat('/vendor/Ruby-IRC/lib/')
$:.unshift File.dirname(__FILE__).concat('/vendor/em-websocket/lib/')

# Now both libraries are in the $LOAD_PATH ($:) we can load them.
require_relative 'vendor/Ruby-IRC/lib/IRC.rb'
require_relative 'vendor/em-websocket/lib/em-websocket.rb'

# We'll also include our Banter API module.
require_relative 'lib/default'

# Initialise the WebSocket on port 8080.
EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |ws|

  ws.onopen {
    puts "WebSocket connection open"

    # publish message to the client
    ws.send "Hello Client"
  }

  ws.onclose { puts "Connection closed" }
  ws.onmessage { |msg|
    puts "Recieved message: #{msg}"
    ws.send "Pong: #{msg}"
  }

  # Initial debug information for the API.
  #ws.onopen    { ws.send "Hello Client!"}
  #ws.onmessage { |msg| ws.send "Pong: #{msg}" }
  #ws.onclose   { puts "WebSocket closed" }

  #banter = Banter::Base.new('Adam', 'irc.freenode.net', 'banter-test', 6667)
  ##banter.send_message 'Hello all!'

end
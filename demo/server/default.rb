# Update our $LOAD_PATH to include Ruby-IRC and Em-Websocket.
$:.unshift File.dirname(__FILE__).concat('/vendor/Ruby-IRC/lib/')
#$:.unshift File.dirname(__FILE__).concat('/vendor/em-websocket/lib/')

# Our native dependencies.
require 'json'
require 'digest/md5'

# Now both libraries are in the $LOAD_PATH ($:) we can load them.
require_relative 'vendor/Ruby-IRC/lib/IRC.rb'
require_relative 'vendor/em-websocket/lib/em-websocket.rb'

#require ('Ruby-IRC/lib/IRC.rb');

# We'll also include our Banter API module.
require_relative 'lib/default'

# Initialise the WebSocket on port 8080.
EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |websocket|

  websocket.onopen {
    puts "Banter.js Initialised..."

    # publish message to the client
    websocket.send({ :name => 'Adam', :message => 'Test...', :hash => Digest::MD5.hexdigest("adam.timberlake@gmail.com") }.to_json)
  }

  websocket.onclose { puts "Connection closed" }
  websocket.onmessage { |msg|
    puts "Received message: #{msg}"
    #websocket.send "Pong: #{msg}"
  }

  # Initial debug information for the API.
  #websocket.onopen    { websocket.send "Hello Client!"}
  #websocket.onmessage { |msg| websocket.send "Pong: #{msg}" }
  #websocket.onclose   { puts "WebSocket closed" }

  #banter = Banter::Base.new('BanterJS-Adam', 'irc.freenode.net', 'banter-test', 6667)
  ##banter.send_message 'Hello all!'

end
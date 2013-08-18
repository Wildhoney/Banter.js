# Our dependencies.
require 'rubygems'
require 'eventmachine'
require 'ponder'
require 'json'
require 'em-websocket'
require 'em-promise'
require 'digest/md5'

# We'll also include our Banter API module.
require_relative 'lib/default'

EM.run do
  EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |websocket|

    # Create an instance of the Banter.js server!
    banter = Banter.new

    # Using promises we'll connect to the IRC server, join the channel, and then
    # resolve our promise -- updating the client connected via WebSockets.
    banter.connect('BanterEM-Adam', 'irc.freenode.net', 6667, '#banter-test').then {
      websocket.send({
        :command    => true,
        :connected  => true,
        :gravatar   => Digest::MD5.hexdigest('adam.timberlake@gmail.com')
      }.to_json)
    }

    # Configure the responding to messages.
    banter.irc.on :channel do |event|
      websocket.send({
        :command  => false,
        :name     => event[:user].sub!('~', ''),
        :message  => event[:message] }.to_json)
    end

    websocket.onmessage { |data|
      # When a message is received we'll send that to the IRC channel!
      message = JSON.parse data
      banter.send_message message['message']
    }

    end
end
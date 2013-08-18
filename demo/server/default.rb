# Update our $LOAD_PATH to include Ruby-IRC and Em-Websocket.
$:.unshift File.dirname(__FILE__).concat('/vendor/Ruby-IRC/lib/')
#$:.unshift File.dirname(__FILE__).concat('/vendor/em-websocket/lib/')

# Our native dependencies.
require 'rubygems'
require 'eventmachine'
require 'ponder'
require 'json'
require 'em-websocket'
require 'em-promise'
require 'digest/md5'

#require ('Ruby-IRC/lib/IRC.rb');

# We'll also include our Banter API module.
require_relative 'lib/default'

EM.run do
  EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |websocket|

      irc = Ponder::Thaum.new do |config|
        config.nick   = 'BanterEMAdam'
        config.server = 'irc.freenode.net'
        config.port   = 6667
      end

      irc.on :connect do
        irc.join '#banter-test'
      end

      irc.on :join do |data|
        websocket.send({ :command => true, :connected => true }.to_json)
        user = data[:join].user
      end

      irc.connect

    end
end
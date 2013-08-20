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

    # Username of the connect client.
    username = ''

    websocket.onmessage { |data|

      # When a message is received we'll send that to the IRC channel!
      message = JSON.parse data

      # Disconnect from the server if the client sent message.command message.disconnect to true.
      if message['command'] && message['disconnect']
        banter.irc.quit
      elsif message['command'] && message['username']

        username = message['username']

        # Using promises we'll connect to the IRC server, join the channel, and then
        # resolve our promise -- updating the client connected via WebSockets.
        banter.connect(message['username'], 'irc.freenode.net', 6667, '#banter-test').then {

          websocket.send({
           :command    => true,
           :connected  => true,
           :gravatar   => Digest::MD5.hexdigest('adam.timberlake@gmail.com')
          }.to_json)

          # Configure the responding to messages.
          banter.irc.on :channel do |event|

            if (event[:user] != '~Ponder')

              websocket.send({
               :command  => false,
               :name     => event[:user].sub!('~', ''),
               :message  => event[:message] }.to_json
              )

            end

          end

          # When the client closes the browser, then we'll need to remove them from
          # the IRC channel.
          websocket.onclose {
            banter.irc.quit
          }

        }

      else
        banter.send_message message['message']
      end
    }

    end
end
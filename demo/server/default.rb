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

          # Send back the information to the client, such as their MD5 hash for Gravatar.
          websocket.send({
           :command    => true,
           :connected  => true,
           :gravatar   => Digest::MD5.hexdigest('adam.timberlake@gmail.com')
          }.to_json)

          # Configure the responding to messages.
          banter.irc.on :channel do |event|

            # Find the sender of the message as well as the potential receiver.
            sender    = event[:user].sub!('~', '')
            receiver  = event[:message].match(/^(.+):/i)

            # Beautify the message getting sent to the client!
            message = event[:message]
            message.sub!(username, '')
            message.sub!(':', '')
            message.chomp!

            # Only send the message to the client if it's not from the "Ponder" username --
            # which means another client sent it, or it's not intended for the current user.
            websocket.send({
             :command  => false,
             :name     => sender,
             :type     => 'received',
             :message  => event[:message] }.to_json
            ) if !receiver.nil? && sender != 'Ponder' && receiver[1] == username

          end

          # When the client is kicked from the IRC channel by one of the staff members.
          banter.irc.on :kick do |event|
            banter.irc.quit
            websocket.close_connection
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
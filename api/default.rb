$:.unshift File.dirname(__FILE__).concat('/vendor/Ruby-IRC/lib/')
$:.unshift File.dirname(__FILE__).concat('/vendor/em-websocket/lib/')

require_relative 'vendor/Ruby-IRC/lib/IRC.rb'
require_relative 'vendor/em-websocket/lib/em-websocket.rb'

# Initialise the WebSocket on port 8080.
EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|

  # Initial debug information for the API.
  ws.onopen    { ws.send "Hello Client!"}
  ws.onmessage { |msg| ws.send "Pong: #{msg}" }
  ws.onclose   { puts "WebSocket closed" }

end
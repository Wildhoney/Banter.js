module Banter

  class Base

    #method initialize
    #param name {String}
    #constructor
    def initialize(name)
      @name = name
    end

    #method client
    #return IRC {Instance}
    def client
      bot = IRC.new(@name, 'discussion.banterjs.com', '6667', 'Banter.js Client')
      bot.connect
      bot
    end

  end

end
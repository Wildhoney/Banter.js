Banter.js
=========

<img src="https://travis-ci.org/Wildhoney/Banter.js.png?branch=master" alt="Travis CI" />

<img src="https://cdn0.iconfinder.com/data/icons/toys/128/teddy_bear_toy_4.png" />

Talk to your clients in real-time as they browse your website over IRC!

**Demo video:** http://player.vimeo.com/video/72780386

It couldn't be any simpler the way it works. All of your support staff sit in one IRC channel, and clients can connect for help. They all enter the same IRC channel, but are unable to see each other. Messages are sent from the channel to individual clients using "<strong>USER:</strong> Hi!" format, and customers respond with their messages visible to all support staff &ndash; with each staff member having the ability to respond individually and directly.

<img src="http://i.imgur.com/KmrRNX1.png" />

Libraries
---------

 * <strong>EventMachine</strong> &ndash; Ruby based event processing library: https://github.com/eventmachine/eventmachine
 * <strong>Ponder</strong> &ndash; EventMachine based IRC client: https://github.com/tbuehlmann/ponder
 * <strong>Angular</strong> &ndash; MVC JavaScript framework with EDA: https://github.com/angular/angular.js


Sass
---------

By running `grunt` the Sass stylesheet will be processed and a CSS file created in `dist`. If you want to update the path to the images directory, then you can do that in the `default.scss` file by changing `$assets-path` and then running `grunt`.


Screenshots
---------

<img src="http://i.imgur.com/7Lfmo7F.png" />
<img src="http://i.imgur.com/3QrKMTB.png" />
<img src="http://i.imgur.com/AbRST4H.png" />
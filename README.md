Banter.js
=========

<img src="https://travis-ci.org/Wildhoney/Banter.js.png?branch=master" alt="Travis CI" />

Talk to your clients in real-time as they browse your website over IRC!

<iframe src="http://player.vimeo.com/video/72780386" width="434" height="266" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>


Libraries
---------

 * <strong>EventMachine</strong> &ndash; Ruby based event processing library: https://github.com/eventmachine/eventmachine
 * <strong>Ponder</strong> &ndash; EventMachine based IRC client: https://github.com/tbuehlmann/ponder
 * <strong>Angular</strong> &ndash; MVC JavaScript framework with EDA: https://github.com/angular/angular.js


Sass
---------

By running `grunt` the Sass stylesheet will be processed and a CSS file created in `dist`. If you want to update the path to the images directory, then you can do that in the `default.scss` file by changing `$assets-path` and then running `grunt`.
/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

var Nice = function() {
  this.startTime = new Date();
  this.itersSinceLastYield = 0;
};

Nice.prototype.pause = function(cb) {
  var doYield = false;
  var now = new Date();

  // allow no more than 75 iterations before giving it back
  // to the render thread
  if (this.itersSinceLastYield++ > 75) doYield = true;
  // and allow no more than 300ms to elapse before giving
  // it back
  else if ((now - this.startTime) > 300) doYield = true;

  if (doYield) {
    this.startTime = now;
    this.itersSinceLastYield = 0;
    setTimeout(cb, 0);
  } else {
    cb();
  }
};

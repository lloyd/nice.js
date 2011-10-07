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

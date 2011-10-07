var Nice = function(maxCPUPercentage) {
  this.maxCPU = maxCPUPercentage;
  this.startTime = new Date();
  this.itersSinceLastYield = 0;
};

Nice.prototype.pause = function(cb) {
  var doYield = false;
  var now = new Date();

  if (this.itersSinceLastYield++ > 60) doYield = true;
  else if ((now - this.startTime) >  300) doYield = true;

  if (doYield) {
    this.startTime = now;
    this.itersSinceLastYield = 0;
    setTimeout(cb, 0);
  } else {
    cb();
  }
};

NativeExtensions = {
  override: true,
  supressWarnings: false
};

function warn (msg) {
  if (NativeExtensions.supressWarnings) return;

  if (console && console.warn)
    console.warn(msg);
}

function extend (obj, methods) {
  var key;
  for (key in methods) {
    if (methods.hasOwnProperty(key)) {
      if ((obj[key] && NativeExtensions.override) || 
          typeof obj[key] === 'undefined')
        obj[key] = methods[key];
      else if (obj[key] && !NativeExtensions.override)
        warn(key + ' already defined on ' + obj.toString());
    }
  }
}

extend(String.prototype, {
  parameterize: function () {
    var str = this;
    var re = /[^a-z0-9]+/gi; 
    var re2 = /^-*|-*$/g;
    str = str.replace(re, '-');
    return str.replace(re2, '').toLowerCase();
  },

  truncate: function () {
    var str = this.slice(0, count);
    ending = ending || "...";

    if (str.length < this.length)
      str += ending;

    return str;
  }
});

extend(Date.prototype, {
  weeksAgo: function () {
    var today = new Date;

    if ((today.getTime() - this.getTime()) <= 0)
      return 0;

    var oneWeek = 1000 * 60 * 60 * 24 * 7;
    var difference = today.getTime() - this.getTime();

    return Math.floor(difference / oneWeek);
  },

  beginningOfWeek: function () {
    var date = new Date(this);
    date.setDate(date.getDate() - date.getDay());
    date.setHours(0, 0, 0, 0);
    return date;
  },

  endOfWeek: function () {
    var date = new Date(this);
    date.setDate(date.getDate() - date.getDay() + 6);
    date.setHours(23, 59, 59, 59, 999);
    return date;
  },

  beginningOfLastWeek: function () {
    var date = new Date(this);
    date.setDate(date.getDate() - date.getDay() + 6);
    date.setHours(23, 59, 59, 59, 999);
    return date;
  },

  secondsFrom: function (other) {
    return other.getTime() - this.getTime();
  },

  isInPast: function () {
    var today = new Date
      , diff = this.secondsFrom(today);

    return diff > 0;
  },

  isInFuture: function () {
    var today = new Date
      , diff = this.secondsFrom(today);

    return diff < 0;
  }
});

extend(Number.prototype, {
  toTimeComponents: function () {
    var secs = this
      , hours = Math.floor(secs / (60 * 60))
      , divisorForMinutes = secs % (60 * 60)
      , minutes = Math.floor(divisorForMinutes / 60)
      , divisorForSeconds = divisorForMinutes % 60
      , seconds = Math.ceil(divisorForSeconds);

    return {
      h: hours,
      m: minutes,
      s: seconds
    };
  }
});

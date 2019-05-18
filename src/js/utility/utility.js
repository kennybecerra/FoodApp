

var isBrowserIeOrNot = function () {
  return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
}

export function domIsReady(callback) {
  if (callback && typeof callback === 'function') {
    if (isBrowserIeOrNot() !== 'ie') {
      document.addEventListener("DOMContentLoaded", function () {
        return callback();
      });
    } else {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") {
          return callback();
        }
      });
    }
  } else {
    console.error('The callback is not a function!');
  }
}





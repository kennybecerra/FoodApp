import style from "../scss/main.scss";
//import img from "../images/wow.jpg";
import {myFunc} from "./test.js";


// Functions meant to include the assets files if they can not be included via the css or html
//function requireAll(r) { r.keys().forEach(r); } 
//requireAll(require.context('../assets/SVG/', true, /\.svg$/));
//requireAll(require.context('../assets/images/', true,  /\.(png|jpeg|jpg)$/));
//requireAll(require.context('../assets/videos/', true,  /\.(mp4|webm|mov)$/));

/*
let a = "hello";
console.log(a);
myFunc();
*/

var domIsReady = (function(domIsReady) {
    var isBrowserIeOrNot = function() {
       return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
    }
 
    domIsReady = function(callback) {
       if(callback && typeof callback === 'function'){
          if(isBrowserIeOrNot() !== 'ie') {
             document.addEventListener("DOMContentLoaded", function() {
                return callback();
             });
          } else {
             document.attachEvent("onreadystatechange", function() {
                if(document.readyState === "complete") {
                   return callback();
                }
             });
          }
       } else {
          console.error('The callback is not a function!');
       }
    }
 
    return domIsReady;
 })(domIsReady || {});
 

var myLib = (function() {

    var animations = [];
    var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var flag = true;
    var originalDisplay = null;

    // Utility function used by animation function callback
    function addClass(ele,cls) {
        if (!hasClass(ele,cls)) ele.className += " "+cls;
    }

    function hasClass(ele, cls) {

        if (ele instanceof SVGAElement) {
            console.log('this is an SVG');
            console.log( ele.getAttribute('class'));
        }
        return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }

    function removeClass(ele,cls) {
        console.log(ele);
        if (hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
        }
    }

    function fadeIn(el){
        el.style.opacity = 0;
        el.style.display = "flex";
      
        (function fade() {
          var val = parseFloat(el.style.opacity) || 0;
          console.log(val);
          if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
          } 
        })();
    }

    function fadeOut(el){
        el.style.opacity = 1;
      
        (function fade() {
          if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
      }


    return {
        smoothScroll: function(targetclass, duration) {
            var target = document.querySelector(targetclass);
            var targetPosition = target.getBoundingClientRect().top;
            var startPosition = window.pageYOffset || window.scrollY;
            var distance = targetPosition - startPosition;
            var startTime = null;
          
            function loop(currentTime) {
              if (startTime === null) startTime = currentTime;
              var timeElapsed = currentTime - startTime;
              var run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(loop);
            }

            function ease(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t*t + b;
                t -= 2;
                return -c/2 * (t*t*t*t - 2) + b;
            };
            
            requestAnimationFrame(loop);
        },
        myTest: function() {
              console.log("Hellow there")
        },
        scrollIt: function(destination, duration = 200, easing = 'linear', offset, callback) {

            const easings = {
              linear(t) {
                return t;
              },
              easeInQuad(t) {
                return t * t;
              },
              easeOutQuad(t) {
                return t * (2 - t);
              },
              easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
              },
              easeInCubic(t) {
                return t * t * t;
              },
              easeOutCubic(t) {
                return (--t) * t * t + 1;
              },
              easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
              },
              easeInQuart(t) {
                return t * t * t * t;
              },
              easeOutQuart(t) {
                return 1 - (--t) * t * t * t;
              },
              easeInOutQuart(t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
              },
              easeInQuint(t) {
                return t * t * t * t * t;
              },
              easeOutQuint(t) {
                return 1 + (--t) * t * t * t * t;
              },
              easeInOutQuint(t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
              }
            };
          
            const start = window.pageYOffset;
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
          
            const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
            const destinationOffset = typeof destination === 'number' ? destination : (destination.offsetTop + offset) ;
            const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
          
            if ('requestAnimationFrame' in window === false) {
              window.scroll(0, destinationOffsetToScroll);
              if (callback) {
                callback();
              }
              return;
            }
          
            function scroll() {
              const now = 'now' in window.performance ? performance.now() : new Date().getTime();
              const time = Math.min(1, ((now - startTime) / duration));
              const timeFunction = easings[easing](time);
              window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
          
              if (window.pageYOffset === destinationOffsetToScroll) {
                if (callback) {
                  callback();
                }
                return;
              }
          
              requestAnimationFrame(scroll);
            }
          
            scroll();
          },
          enableAnimations: function() {

            for( var itr = 0; itr < animations.length ; itr++) {

                //var elements = document.getElementsByClassName('myonscroll1');
                var elements = document.getElementsByClassName(animations[itr][1]);
        
                //iterate throughout the collection
                for (var i = 0; i < elements.length; i++){
                    
                    //find if the item is inside the viewport and what percetage is inside
                    var rect = elements[i].getBoundingClientRect();
                    var percentageShown;
        
                    if (rect.bottom  <= 0 || rect.top >= window.innerHeight) {
                        percentageShown = 0;
                    } 
                    else if ( rect.top < 0 && rect.bottom > 0 && rect.bottom <= window.innerHeight) {
                            percentageShown = rect.bottom / rect.height;
                    }
                    else if (rect.top < 0 && rect.bottom > 0 && rect.bottom > window.innerHeight) {
                        percentageShown = window.innerHeight / rect.height;
                    }
                    else if (rect.top >= 0 && rect.bottom > 0  && rect.bottom <= window.innerHeight) {
                        percentageShown = 100;
                    }
                    else if ( rect.top >= 0 && rect.bottom > 0  && rect.bottom > window.innerHeight) {
                        percentageShown = (window.innerHeight - rect.top)/rect.height;
                    }
                    else {
                        console.log('the item didnt register - start');
                        console.log("top: " + rect.top + ',  bottom: ' + rect.bottom);
                        console.log('the item didnt register - end');
                    }
        
                    console.log('the percentage shown is ' + percentageShown.toFixed(2) + ' %');
                    //console.log(elements[i]);
        
                    if (percentageShown >= animations[itr][2]) {
                        //console.log(hasClass(elements[i], 'myonscroll1'));
                        //addClass(elements[i], 'animate-footer-text')
                        //removeClass(elements[i], 'myonscroll1');
                        addClass(elements[i], animations[itr][0]);
                        //removeClass(elements[i], AnimateElements[itr]); 
                        console.log('animation fire');
                    } 
                }
    
            }
          },
          addAnimation: function(object) {
              animations.push(object);
          },
          getAnimations: function() {
              return [...animations];
          },
        enableAnimationsother:  function() {
            for( var itr = 0; itr < animations.length ; itr++) {
                if (animations[itr].check === "inView") {
                    //var elements = document.getElementsByClassName('myonscroll1');
                    var elements = document.getElementsByClassName(animations[itr].className);
        
                    //iterate throughout the collection
                    for (var i = 0; i < elements.length; i++){
                        
                        //find if the item is inside the viewport and what percetage is inside
                        var rect = elements[i].getBoundingClientRect();
                        var percentageShown;
            
                        if (rect.bottom  <= 0 || rect.top >= window.innerHeight) {
                            percentageShown = 0;
                        } 
                        else if ( rect.top < 0 && rect.bottom > 0 && rect.bottom <= window.innerHeight) {
                                percentageShown = rect.bottom / rect.height;
                        }
                        else if (rect.top < 0 && rect.bottom > 0 && rect.bottom > window.innerHeight) {
                            percentageShown = window.innerHeight / rect.height;
                        }
                        else if (rect.top >= 0 && rect.bottom > 0  && rect.bottom <= window.innerHeight) {
                            percentageShown = 100;
                        }
                        else if ( rect.top >= 0 && rect.bottom > 0  && rect.bottom > window.innerHeight) {
                            percentageShown = (window.innerHeight - rect.top)/rect.height;
                        }
                        else {
                            console.log('the item didnt register - start');
                            console.log("top: " + rect.top + ',  bottom: ' + rect.bottom);
                            console.log('the item didnt register - end');
                        }
            
                        //console.log('the percentage shown is ' + percentageShown.toFixed(2) + ' %');
                        //console.log(elements[i]);
            
                        if (percentageShown >= animations[itr].options.percentage) {
                            //console.log(hasClass(elements[i], 'myonscroll1'));
                            //addClass(elements[i], 'animate-footer-text')
                            //removeClass(elements[i], 'myonscroll1');
                            addClass(elements[i], animations[itr].animation);
                            //removeClass(elements[i], AnimateElements[itr]); 
                            
                        } 
                    }
                }
                else if (animations[itr].check === "threshold") {
                    var current = window.pageYOffset || document.documentElement.scrollTop;

                    var threshold = (typeof animations[itr].options.marker === 'number') ? animations[itr].options.marker : window.innerHeight; 
                    var offset = animations[itr].options.offset || 0;

                    if (current > threshold + offset) {
                        if (current > lastScrollTop) {

                            if (flag) {
                                var elements = document.getElementsByClassName(animations[itr].className);    
                                //iterate throughout the collection
                                for (var i = 0; i < elements.length; i++){
                                    fadeIn(elements[i]);
                                }
                                flag = !flag;
                            }
                        }
                        else 
                        {
                            
                        }
                        
                    }  
                    else {
                        if (current < lastScrollTop) {
                            if (!flag) {
                                var elements = document.getElementsByClassName(animations[itr].className); 
                                 
                                //iterate throughout the collection
                                for (var i = 0; i < elements.length; i++){
                                    fadeOut(elements[i]);
                                }
                                flag = !flag;
                            }
                        }
                    }

                }    
            }

            lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
        }
    }

    
 })();

 (function(domIsReady) {
    domIsReady(function() {
       console.log('This is my self contained code that is ready');
       myLib.myTest();

        /*
        document.querySelector('.option-1').addEventListener('click', function() {
            myLib.smoothScroll('.cities', 3000);
        });
        */

        
        //myLib.addAnimation('animate-fade-entrance', 'fadeInOnMyScroll', .90);
        
        myLib.addAnimation({
            className: "fadeInOnMyScroll",
            animation: "animate-fade-entrance",
            check: "inView",
            options: {
                percentage: .90
            }
        });

        myLib.addAnimation({
            className: "fadeInOnThreshold",
            animation: "appear",
            check: "threshold",
            options: {
                marker: '100vh',
                offset: -100
            }
        });
        

        
        document.querySelector('.option-1').addEventListener('click', function() {
            myLib.scrollIt(document.getElementById('food'), 1200, 'easeInOutQuint', -100);
        });
        
       
        window.addEventListener('scroll', myLib.enableAnimationsother);
        /* 
        window.addEventListener('scroll', function() {
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            console.log(`Yoffset is ${st} : window inner height is ${window.innerHeight}`);
        });
        */

        /*
       var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
       // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
       
       window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
          var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
          if (st > lastScrollTop){
             console.log("down scrolling")
          } else {
            console.log("up scrolling")
          }
          lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
       }, false);
       */
       /*
      window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
      console.log(`Inner height is ${window.innerHeight} : clientHeight is ${window.clientHeight}`);
        }, false);
    */


    });
 })(domIsReady);


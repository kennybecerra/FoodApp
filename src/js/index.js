import style from '../scss/main.scss';
import * as utility from './utility/utility';
import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.polyfills.min.js';
import scrollmagic from 'ScrollMagic';
// import 'debug.addIndicators';
import anime from 'animejs/lib/anime.es.js';

utility.domIsReady(() => {
  console.log('The app is ready !!!');
  // SET SCROLL NAVIGATIONS FROM CLICKING ON LINK
  let scroll = new SmoothScroll({
    speed: 500,
    easing: 'easeInOutQuart',
    updateURL: false
  });

  // Setting animation for phone fade in
  let controller = new scrollmagic.Controller();
  new scrollmagic.Scene({
    duration: 0,
    triggerElement: '#works',
    triggerHook: 0.4
  })
    .addTo(controller)
    .on('enter', () => {
      let classes = document.querySelector('.fadeInOnMyScroll').classList;

      if (!classes.contains('animate-fade-entrance')) {
        classes.add('animate-fade-entrance');
      }
    });

  //Setting animation for navigation bar FadeIN/FadeOUT
  const animation = anime({
    targets: '.fadeInOnThreshold',
    opacity: [0, 1],
    zIndex: {
      value: [-2, 10],
      round: true
    },
    autoplay: false,
    direction: 'normal',
    easing: 'linear'
  });

  new scrollmagic.Scene({
    duration: '10%',
    triggerElement: '#about',
    triggerHook: 0.2
  })
    .addTo(controller)
    .on('progress', event => {
      animation.seek(event.progress * animation.duration);
    });

  //SETTING ALL CLICK EVENTS FOR NAVIGATION
  document.querySelectorAll('[class*="option-"]').forEach(element => {
    let option = RegExp('option-[1-8]').exec(element.className)[0];

    element.addEventListener('click', e => {
      e.preventDefault();
      switch (option) {
        case 'option-1':
          scroll.animateScroll(document.getElementById('works'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
        case 'option-2':
          scroll.animateScroll(document.getElementById('cities'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
        case 'option-3':
          scroll.animateScroll(document.getElementById('plans'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
        case 'option-4':
          scroll.animateScroll(document.getElementById('signUp'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
        case 'option-5':
          scroll.animateScroll(document.getElementById('works'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
        case 'option-6':
          scroll.animateScroll(document.getElementById('cities'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
        case 'option-7':
          scroll.animateScroll(document.getElementById('plans'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
        case 'option-8':
          scroll.animateScroll(document.getElementById('signUp'), null, {
            offset: function() {
              return Math.floor(window.innerHeight * 0.1);
            }
          });
          break;
      }

      console.log('event dispatched');
      console.log(element);
    });
  });

  //Set Form Logic
  document.querySelector('#formInfo').addEventListener('submit', e => {
    e.preventDefault();
    console.log(e);
  });
});

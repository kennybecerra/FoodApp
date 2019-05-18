import style from "../scss/main.scss";
import * as utility from './utility/utility'
import SmoothScroll from 'smooth-scroll';
import ScrollMagic from 'scrollmagic'

utility.domIsReady(() => {

    console.log('The app is ready !!!')
    // SET SCROLL NAVIGATIONS FROM CLICKING ON LINKS      

    let scroll = new SmoothScroll({
        speed: 500
    })

    let controller = new ScrollMagic.Controller()
    new ScrollMagic.Scene({
        duration: '100%',
        triggerElement: '#works',
        triggerHook: 'onEnter'
    }).setClassToggle(".fadeInOnMyScroll", "animate-fade-entrance").addTo(controller);




    document.querySelectorAll('[class*="option-"]').forEach((element) => {
        let option = RegExp('option-[1-8]').exec(element.className)[0];

        element.addEventListener('click', (e) => {
            e.preventDefault();
            switch (option) {
                case 'option-1': scroll.animateScroll(document.getElementById('works')); break;
                case 'option-2': scroll.animateScroll(document.getElementById('works')); break;
                case 'option-3': scroll.animateScroll(document.getElementById('works')); break;
                case 'option-4': scroll.animateScroll(document.getElementById('works')); break;
                case 'option-5': scroll.animateScroll(document.getElementById('works')); break;
                case 'option-6': scroll.animateScroll(document.getElementById('cities')); break;
                case 'option-7': scroll.animateScroll(document.getElementById('plans')); break;
                case 'option-8': scroll.animateScroll(document.getElementById('signUp')); break;
            }


            console.log('event dispatched')
            console.log(element);
        })


    })

})

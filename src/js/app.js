/* jshint esversion: 6 */

import 'gsap'
import 'gsap/ScrollToPlugin'

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const App = {
  init: () => {
    document.getElementById("loader").style.display = "none"

    App.pointer = document.getElementById("pointer")
    App.ui1 = document.getElementById("ui")
    App.ui2 = document.getElementById("ui2")
    App.currentPost = document.querySelector('.post')
    App.sizeSet()

    // setTimeout(function() {
    //   TweenMax.to(window, 1.2, {
    //     scrollTo: '.post:nth-child(4)',
    //     ease: Power4.easeOut
    //   });
    // }, 2000);

    // function flick() {
    //   setTimeout(function() {
    //     document.documentElement.classList.toggle('invert')
    //     flick();
    //   }, rand(1, 5));
    // }
    // flick()

    setInterval(() => {
      if (App.isSwiping) return
      TweenMax.to(App.pointer, 1, {
        x: rand(30, 70) / 100 * App.width,
        y: rand(80, 85) / 100 * App.height,
        ease: Power2.easeInOut,
        force3D: true,
        onUpdate: function() {
          App.updateUI(Math.floor(App.pointer._gsTransform.x), Math.floor(App.pointer._gsTransform.y))
        }
      })
    }, 1000)

    App.loop()

    // setInterval(() => {
    //   TweenMax.to(App.pointer, 2, {
    //     x: rand(30, 70) / 100 * App.width,
    //     y: rand(80, 85) / 100 * App.height,
    //     ease: Power2.easeInOut,
    //     force3D: true,
    //     onUpdate: function() {
    //       App.updateUI(Math.floor(App.pointer._gsTransform.x), Math.floor(App.pointer._gsTransform.y))
    //     }
    //   })
    // }, 2000)

    window.addEventListener('resize', App.sizeSet)
    document.getElementById('loader').style.display = 'none'
  },
  sizeSet: () => {
    App.width = (window.innerWidth || document.documentElement.clientWidth);
    App.height = (window.innerHeight || document.documentElement.clientHeight);
  },
  loop: () => {
    setTimeout(function() {
      App.random();
    }, rand(1000, 3000));
  },
  random: () => {
    App.isSwiping = true
    TweenMax.killTweensOf(App.pointer)
    TweenMax.killTweensOf(window)

    if (rand(0, 100) < 33) {
      App.currentPost = App.getNext()
      App.currentPostFake = App.currentPost
      App.currentPost = App.getNext(true)
      console.log(App.currentPostFake.dataset.id, App.currentPost.dataset.id)
      new TimelineMax({
        onComplete: function() {
          App.loop()
          App.isSwiping = false
        }
      }).to(App.pointer, 0.2, {
        scale: 1.7,
        ease: Expo.easeOut,
      }).to(App.pointer, 1, {
        y: rand(2, 5) / 100 * App.height,
        scale: 1,
        ease: Expo.easeOut,
        force3D: true,
      }).to(window, 1, {
        scrollTo: App.currentPostFake.getBoundingClientRect().top + App.height / 1.7 + window.pageYOffset,
        ease: Power4.easeOut
      }, '-=0.8').to(App.pointer, 1, {
        y: rand(80, 85) / 100 * App.height,
        ease: Expo.easeOut,
        scale: 1,
        force3D: true,
      }, '-=0.5').to(App.pointer, 0.2, {
        scale: 1.7,
        ease: Expo.easeOut,
      }).to(App.pointer, 0.6, {
        y: rand(2, 5) / 100 * App.height,
        scale: 1,
        ease: Expo.easeOut,
        force3D: true,
      }).to(window, 1.4, {
        scrollTo: App.currentPost,
        ease: Power4.easeOut
      }, '-=0.5').to(App.pointer, 1, {
        x: rand(30, 60) / 100 * App.width,
        y: 47 / 100 * App.height,
        ease: Expo.easeOut,
        force3D: true,
      }, '-=0.5').to(App.pointer, 0.05, {
        scale: 1.7,
        ease: Expo.easeOut,
      }).to(App.pointer, 0.05, {
        scale: 1,
        onComplete: function() {
          document.documentElement.classList.add('invert')
          setTimeout(function() {
            document.documentElement.classList.remove('invert')
          }, 100);
          setTimeout(function() {
            document.documentElement.classList.add('invert')
          }, 200);
          setTimeout(function() {
            document.documentElement.classList.remove('invert')
          }, 300);

        },
        ease: Expo.easeOut,
      }, '+=0.5').to(App.pointer, 0.2, {
        y: App.height - 100,
        scale: 1,
        ease: Expo.easeOut,
        force3D: true,
      });
    } else {
      App.currentPost = App.getNext()
      new TimelineMax({
        onComplete: function() {
          App.isSwiping = false
          App.loop()
        }
      }).to(App.pointer, 0.2, {
        scale: 1.7,
        ease: Expo.easeOut,
      }).to(App.pointer, 1, {
        y: rand(2, 5) / 100 * App.height,
        scale: 1,
        ease: Expo.easeOut,
        force3D: true,
      }).to(window, 1.2, {
        scrollTo: App.currentPost,
        ease: Power4.easeOut
      }, '-=0.8').to(App.pointer, 1, {
        y: rand(80, 85) / 100 * App.height,
        ease: Expo.easeOut,
        scale: 1,
        force3D: true,
      }, '-=0.5');
    }
    App.active(App.currentPost)

  },
  active: (elem) => {
    const c = document.querySelector('.active')
    if (c) {
      c.classList.remove('active')

    }
    if (elem) elem.classList.add('active')
  },
  getNext: (force = false) => {
    let i = 1
    let random = rand(2, 4)
    if (force) random = rand(3, 5)
    let elem = App.currentPost
    while (elem && i < random) {
      elem = elem.nextElementSibling
      if(!elem) {
        window.scroll(0,0)
        elem = document.querySelector('.post')
      }
      i++
    }
    return elem
  },
  updateUI: (x, y) => {
    App.ui1.innerText = x * y + ' Hz'
    App.ui2.innerHTML = '<p>X:&nbsp;&nbsp;' + x + '</p><p>Y:&nbsp;&nbsp;' + y + '<p>'
  }
}

document.addEventListener("DOMContentLoaded", App.init);
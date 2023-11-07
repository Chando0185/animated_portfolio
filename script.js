function init(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

init();




var crsr = document.querySelector("#cursor");
var crsr_blur = document.querySelector("#cursor-blur");
var main = document.querySelector("#main");

main.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px";
  crsr.style.top = dets.y + "px";
  crsr_blur.style.left = dets.x - 200 + "px";
  crsr_blur.style.top = dets.y - 200 + "px";
});

var t1 = gsap.timeline();

t1.from("#nav-first, #nav-second h3", {
  y: -5,
  duration: 1,
  delay: 0.3,
  opacity: 0,
  stagger: true,
  scrub: 2,
});

t1.from("#nav-third button", {
  y: -0.3,
  repeat: -1,
  scale: 1.2,
  opacity: 0,
  stagger: 1,
  scrub: 2,
  yoyo: true,
});

t1.from("#left h1, #left p", {
  y: -10,
  opacity: 0,
  yoyo: true,
  stagger: 1,
  scrub: 2,
});

t1.from("#left button", {
  y: -10,
  repeat: -1,
  duration: 1,
  opacity: 0,
  yoyo: true,
  stagger: 2,
  scrub: 2,
});

t1.from("#right img", {
  scale: 2,
  duration: 0.2,
  opacity: 0,
});

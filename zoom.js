/*

// Usual boilerplate scroll-wheel incompatibility plaster.

var div = document.body;
div.addEventListener("DOMMouseScroll", grabScroll, { passive: false });
div.addEventListener("mousewheel", grabScroll, { passive: false });

function grabScroll(e) {
  var dy = -(e.wheelDeltaY || e.wheelDelta || 0);
  if (e.detail != null) {
    if (e.axis == e.HORIZONTAL_AXIS) dx = e.detail;
    else if (e.axis == e.VERTICAL_AXIS) dy = e.detail;
  }
  if (dy > 0) {
    //console.log(dy)
    if(dy > 50){
    div.scrollTop += wh/15;
    } else {
      div.scrollTop += dy;
    }
  } else {
    if(dy < -50){
      div.scrollTop += -wh/15;
      } else {
        div.scrollTop += dy;
      }
  }

  if (dx || dy) { e.preventDefault(); e.stopPropagation(); }
}
*/
function StyleElements() {
    //document.querySelector(".zoom").style.height = Math.max(600, window.innerHeight) +'px';
    //document.getElementById("img-fit").style.height = Math.max(600, window.innerHeight) +'px';
    //document.getElementById("img-fit").style.width = Math.max(600, window.innerWidth) +'px';
    //document.getElementById("my-img").style.height = Math.max(600, window.innerHeight) +'px';
    
    //let diff = window.innerWidth - window.innerHeight;
    
    if(window.innerWidth > 750){
        //document.getElementById("bbig").style.scale = 1+(diff/1200);
        //document.body.style.overflowX = 'hidden';
        //document.querySelector(".color_chg-btn").style.right = '1px';
        document.querySelector(".color_chg-btn").style.scale = '.8';
        document.querySelector(".color_chg-btn").style.padding = '6%';
    } else {
        //document.body.style.overflowX = 'visible'; // remember
        document.querySelector(".color_chg-btn").style.scale = '.7';
        document.querySelector(".color_chg-btn").style.padding = '0%';
        //document.querySelector(".color_chg-btn").style.right = (window.innerWidth-600)*100/window.innerWidth + '%' ;
    }
}

window.onload = function() {
  setTimeout(function () {
    document.getElementById("preloader").remove();
    document.getElementById("myDiv").style.display = "block";
    //draw();
    document.body.style.background = "wheat";
    init();
}, 10000);


var wh = window.innerHeight;
setTimeout(function () {
 //     ScrollTrigger.refresh()
 ScrollTrigger.refresh()

      gsap.registerPlugin(ScrollTrigger);

      const tl1 = gsap.timeline( {
        scrollTrigger: {
          normalizeScroll: true,
          trigger: ".qwer",
          scrub: 1,
          //markers: true,
          pin: ".qwer",
          ease: "slow",
          start: "top top",
          end: "+=" + 4*wh
        }
      })
      
      //tl.totalDuration(20); 
      
        tl1
        //.to('.qwer', { scale: 10,  ease: "power1.inOut"})
        //.to('.center', { opacity: 0,  ease: "power1.inOut"})
        //.from('#trigger1', {drawSVG:'0 0', ease:'none'}, 0)
        .to('path#word', {strokeDashoffset: 0,  ease:  'power2.easeInOut'})
        .to('path#word1', {strokeDashoffset: 0,  ease:  'power2.easeInOut' })
        .to('path#word2',  {strokeDashoffset: 0,  ease:  'power2.easeInOut'})
        .to('path#word3',  {strokeDashoffset: 0,  ease:  'power2.easeInOut'})
        .to('path#word4', {strokeDashoffset: 0,  ease: 'power2.easeInOut'})
        .to('path#word5', {strokeDashoffset: 0,  ease:  'power2.easeInOut'})
        .to('path#dot', {strokeDashoffset: 0, fill: "#fff",  ease:  'power2.easeInOut'})
        .to('.center', { opacity: 0})
        //.to('.zoom', { filter: "url(#liquify)" ,ease: "power1.inOut"})
        //normalizeScroll
        //.to('#bbig', { height: "100vh", width: "100vw", ease: "power1.inOut"})


    const tl = gsap.timeline( {
    scrollTrigger: {
    normalizeScroll: true,
    trigger: "#clipe",
    scrub: 1,
    //markers: true,
    pin: "#clipe",
    ease: "slow",
    start: "top top",
    end: "+=" +4*wh
  }
})

//tl.totalDuration(20); 

  tl
  //.to('.center', { opacity: 0 })
  .from('#clipe', {xPercent:-100, duration: 5,  ease:  'power3.easeInOut' })
   //.to('.intro-text-bold', { opacity: 0.1, duration: 10, ease:'power2.out'})
   .to('.q5', { opacity: 0.1, duration: 5,  ease:  'power3.easeInOut'})
   .to('.q1', { opacity: 0.4, duration: 5,  ease:  'power3.easeInOut'})
   .to('.q2', { opacity: 0.3, duration: 5,  ease:  'power3.easeInOut'})
   .to('.q4', { opacity: 0.5, duration: 5,  ease:  'power3.easeInOut'})
   .to('.q3', { opacity: 0.2, duration: 5,  ease:  'power3.easeInOut'})
   .to('.q7', { opacity: 0.2, duration: 5,  ease:  'power3.easeInOut'})
   .to('.q6', { opacity: 0.7, duration: 5,  ease:  'power3.easeInOut'})


   //.from(".intro-text-bold",  { y: innerHeight * 1.5 })
   .to('.it', {fontSize: "10vmax", duration: 10, ease:  'power3.easeInOut'}) //color: "darkcyan",
   //.to('.intro-text-bold', {  delay:30, ease:'power2.out' })
   //.from('.aboutme', { xPercent:100, duration: 5, ease:'power2.out' })
   //.from(".intro-text",  { y: innerHeight * 1.5 })

const tl2 = gsap.timeline( {
  scrollTrigger: {
  normalizeScroll: true,
  trigger: "#clipe1",
  scrub: 1,
  //markers: true,
  pin: "#clipe1",
  ease: "slow",
  start: "top top",
  end: "+=" + 4*wh
}
})

//tl.totalDuration(20); 

tl2
//.to('.center', { opacity: 0 })
.from('#clipe1', {xPercent:-100, duration: 5,  ease:  'power3.easeInOut' })
 //.to('.intro-text-bold', { opacity: 0.1, duration: 10, ease:'power2.out'})
 .to('.r6', { opacity: 0.1, duration: 5,  ease:  'power3.easeInOut'})
 .to('.r1', { opacity: 0.4, duration: 5,  ease:  'power3.easeInOut'})
 .to('.r2', { opacity: 0.3, duration: 5,  ease:  'power3.easeInOut'})
 .to('.r4', { opacity: 0.5, duration: 5,  ease:  'power3.easeInOut'})
 .to('.r3', { opacity: 0.2, duration: 5,  ease:  'power3.easeInOut'})
 .to('.r5', { opacity: 0.2, duration: 5,  ease:  'power3.easeInOut'})
 //.from(".intro-text-bold",  { y: innerHeight * 1.5 })
 .to('.it1', {fontSize: "10vmax", duration: 10, ease:  'power3.easeInOut'}) //color: "darkcyan",
 //.to('.intro-text-bold', {  delay:30, ease:'power2.out' })
 //.from('.aboutme', { xPercent:100, duration: 5, ease:'power2.out' })
 //.from(".intro-text",  { y: innerHeight * 1.5 })

}, 10000);


StyleElements();

}


window.onresize = function() {
    StyleElements();
    //document.querySelector(".main").style.width =  Math.max(600, window.innerWidth) +'px';
    //document.body.style.width = "100%";
    //document.querySelector('.cursor__ball--big').style.transform = "translate(150px, 38vh)";
  //  window.scrollBy(0, 1); // 0 pixels horizontal and 1 pixel down
//window.scrollBy(0, -1); // 0 pixels horizontal and 1 pixel up
}






    











$(document).ready(function(){
  $(this).scrollTop(0);
});



function StyleElements() {
    //document.querySelector(".zoom").style.height = Math.max(600, window.innerHeight) +'px';
    //document.getElementById("img-fit").style.height = Math.max(600, window.innerHeight) +'px';
    //document.getElementById("img-fit").style.width = Math.max(600, window.innerWidth) +'px';
    //document.getElementById("my-img").style.height = Math.max(600, window.innerHeight) +'px';
    
    //let diff = window.innerWidth - window.innerHeight;
    
    if(window.innerWidth > 600){
        //document.getElementById("bbig").style.scale = 1+(diff/1200);
        document.body.style.overflowX = 'hidden';
        document.querySelector(".color_chg-btn").style.right = '1px';
    } else {
        document.body.style.overflowX = 'visible'; // remember
        document.querySelector(".color_chg-btn").style.right = (window.innerWidth-600)*100/window.innerWidth + '%' ;
    }
}

window.onload = function() {
  setTimeout(function () {
    document.getElementById("preloader").remove();
    document.getElementById("myDiv").style.display = "block";
}, 10000);
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
          ease: "elastic(2.5, 1)",
          start: "top top",
          end: "+=500%"
        }
      })
      
      //tl.totalDuration(20); 
      
        tl1
        //.to('.qwer', { scale: 10,  ease: "power1.inOut"})
        .to('.center', { opacity: 0,  ease: "power1.inOut"})
        .to('#trigger1', {containerAnimation: tween	})
        //normalizeScroll
        //.to('#bbig', { height: "100vh", width: "100vw", ease: "power1.inOut"})


    const tl = gsap.timeline( {
    scrollTrigger: {
    normalizeScroll: true,
    trigger: ".orange",
    scrub: 1,
    //markers: true,
    pin: ".orange",
    ease: "elastic(2.5, 1)",
    start: "top top",
    end: "+=500%"
  }
})

//tl.totalDuration(20); 

  tl
  //.to('.center', { opacity: 0 })
  .from('.aboutme', { xPercent:-100, duration: 5, ease:'power2.out' })
   .to('.intro-text-bold', { opacity: 0.1, duration: 10})
   //.from(".intro-text-bold",  { y: innerHeight * 1.5 })
   .to('.intro-text', {fontSize: "10vmax", duration: 10}) //color: "darkcyan",
   .to('.intro-text-bold', { delay: 10 })
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






    











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

StyleElements();

}

window.onresize = function() {
    StyleElements();
    //document.body.style.width =  '1000px';
    //document.body.style.width = "100%";
    //document.querySelector('.cursor__ball--big').style.transform = "translate(150px, 38vh)";
  //  window.scrollBy(0, 1); // 0 pixels horizontal and 1 pixel down
//window.scrollBy(0, -1); // 0 pixels horizontal and 1 pixel up
}






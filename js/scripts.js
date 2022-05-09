// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar-logo").style.width = "100px";
  } else {
    document.getElementById("navbar-logo").style.width = "200px";
  }
} 




// Things to do when window has loaded
window.onload = function() {
  // offset document by navbar height
  document.getElementById("content").style.marginTop = `${document.getElementById("navbar").clientHeight + 50}px`;
}


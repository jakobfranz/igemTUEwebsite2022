// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar-logo").style.width = "100px";
    for (const element of document.getElementsByClassName("navlink")) {
      element.style.fontSize = "2em";
    }
  } else {
    document.getElementById("navbar-logo").style.width = "200px";
    for (const element of document.getElementsByClassName("navlink")) {
      element.style.fontSize = "3em";
    }
  }
} 




// Things to do when window has loaded
window.onload = function() {
  // offset document by navbar height
  document.getElementById("content").style.marginTop = `${document.getElementById("navbar").clientHeight}px`;
}



var smallNavbar = false;
const scrollThreshold = 20;

function changeNavbarHeight() {
    var navbar = document.getElementById("navbar");
    if (smallNavbar) {
        navbar.classList.remove("small");
        navbar.classList.add("big");
    } else {
        navbar.classList.remove("big");
        navbar.classList.add("small");
    }
    smallNavbar = !smallNavbar;
}

window.onscroll = function() {
    if (document.documentElement.scrollTop > scrollThreshold ^ smallNavbar) {
        changeNavbarHeight();
    }
}
// Script File

// Home Section Starts
var menuBtn = document.querySelector('.main-navbar .menu-btn');
var menuList = document.querySelector('.main-navbar .nav-list');
var menuListItems = document.querySelectorAll('.nav-list li a');

menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menuList.classList.toggle('active');
});

for (var i = 0; i < menuListItems.length; i++) {
    menuListItems[i].addEventListener('click', menuItemClicked);
}
function menuItemClicked() {
    menuBtn.classList.remove('active');
    menuList.classList.remove('active');
}

var homeSection = document.querySelector('.home');
window.addEventListener('scroll', pageScrollFunction);
window.addEventListener('load', pageScrollFunction);

function pageScrollFunction() {
    if (window.scrollY > 120) {
        homeSection.classList.add('active');
    }
    else {
        homeSection.classList.remove('active');
    }
}
// Home Section Ends

// Partners Section Starts 
$('.partners-slider').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 10,
    nav: true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>"],
    responsive: {
        0: {
            items: 1
        },
        500: {
            items: 2
        },
        700: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})
// Partners Section Ends 

// Testimonials Section Starts
$('.testimonials-slider').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    margin: 10,
    nav: true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>"],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
})
// Testimonials Section Ends

// Search Functionality
function search() {
    const input = document
        .getElementById("search-bar")
        .value.toLowerCase();
    localStorage.setItem("searchQuery", input);

    if (input.includes("anglisht")) {
        window.location.href = "anglisht.html";
    } else if (input.includes("italisht")) {
        window.location.href = "italisht.html";
    } else if (input.includes("gjermanisht")) {
        window.location.href = "gjermanisht.html";
    } else if (input.includes("kompjuter")) {
        window.location.href = "kompjuter.html";
    } else {
        alert("Kursi nuk u gjet!");
    }
}





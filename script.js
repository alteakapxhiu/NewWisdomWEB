
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
// ================= Initialize Firebase =================
const firebaseConfig = {
    apiKey: "AIzaSyDYmsfeROCFjHCCSoJwFESPGgiRgCVJpV8",
    authDomain: "newwisdomweb.firebaseapp.com",
    projectId: "newwisdomweb",
    storageBucket: "newwisdomweb.appspot.com",
    messagingSenderId: "875979569860",
    appId: "1:875979569860:web:1b5c645a6acd1011572791",
    measurementId: "G-FR48TLHG1L"
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics();
const db = firebase.firestore();
// ================= End Firebase =================

// ================= CV Form Submission =================
document.getElementById("cvForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const cvFile = document.getElementById("inputGroupFile02").files[0];

    if (!cvFile) {
        alert("Please select a CV file to upload!");
        return;
    }

    try {
        // Send CV file to Node.js server for Cloudinary upload
        const formData = new FormData();
        formData.append("file", cvFile);

        const serverResponse = await fetch("http://localhost:5000/upload", { // Update with deployed server URL
            method: "POST",
            body: formData
        });

        if (!serverResponse.ok) throw new Error("Upload failed");

        const data = await serverResponse.json();
        const cvURL = data.url; // Cloudinary file URL from server

        // Save user info and CV URL to Firebase Firestore
        await db.collection("submissions").add({
            fullName,
            email,
            phone,
            cvURL,
            timestamp: new Date()
        });

        alert("✅ Your CV was successfully submitted!");
        e.target.reset();
    } catch (err) {
        console.error("❌ Error submitting CV:", err);
        alert("Something went wrong. Please try again.");
    }
});
// ================= End CV Form Submission =================

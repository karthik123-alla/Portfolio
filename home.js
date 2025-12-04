// home.js

// Sticky Navigation Menu JS Code
let nav = document.querySelector("header");
let scrollBtn = document.querySelector(".scroll-top a");

window.onscroll = function() {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
        scrollBtn.style.display = "block";
    } else {
        nav.classList.remove("sticky");
        scrollBtn.style.display = "none";
    }
};

// --- Skill Bar Animation Logic (NEW INTERACTIVITY) ---

const skillSection = document.getElementById('skills');
const skillBarsGrid = document.querySelector('.skill-bars-grid');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated || !skillBarsGrid) return;

    // Add the class that triggers the CSS transition for all bars
    skillBarsGrid.classList.add('animate-bar');
    skillsAnimated = true;
}

// Intersection Observer to trigger animation when the skills section comes into view
if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

    observer.observe(skillSection);
}

// --- Document Ready and Side Nav/Typing ---
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation for Hero Section
    const typingTextElement = document.querySelector('.typing-text');
    const textToType = "Ashok Karthik";
    let index = 0;

    function typeText() {
        if (!typingTextElement) return; // Guard clause
        if (index < textToType.length) {
            typingTextElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeText, 100); // Typing speed
        }
    }

    if (typingTextElement) {
        typingTextElement.textContent = "";
        typeText();
    }

    // Side Navigation Menu JS Code
    let body = document.querySelector("body");
    let navBar = document.querySelector(".nav-menu"); 
    let menuBtn = document.querySelector(".menu-btn");
    let cancelBtn = document.querySelector(".cancel-btn");
    
    // Check if elements exist before attaching listeners
    if (menuBtn && navBar) {
        menuBtn.onclick = function() {
            navBar.classList.add("active");
            body.style.overflow = "hidden";
        }
    }
    if (cancelBtn && navBar) {
        cancelBtn.onclick = function() {
            navBar.classList.remove("active");
            body.style.overflow = "auto";
        }
    }

    // Side Navigation Bar Close While We Click On Navigation Links
    let navLinks = document.querySelectorAll(".nav-list li a"); 
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function() {
            navBar.classList.remove("active");
            body.style.overflow = "auto";
        });
    }
});

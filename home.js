// Sticky Navigation Menu and Scroll Button (Your existing code)
let nav = document.querySelector("header"); // Changed to 'header'
let scrollBtn = document.querySelector(".scroll-top a"); // Changed selector
// ... existing window.onscroll function remains the same ...

// -----------------------------------------------------
// 1. Skill Bar Animation Logic (NEW INTERACTIVITY)
// -----------------------------------------------------

const skillSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-bar');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    // Iterate over each skill bar and extract the percentage from the .per span
    skillBars.forEach(bar => {
        const percentageText = bar.querySelector('.per').textContent;
        const percentage = parseInt(percentageText.replace('%', ''));
        
        // Find the pseudo-element (::before) through direct style manipulation 
        // Note: We use an inner element or attribute for cleaner manipulation. 
        // For simplicity, we'll set a style attribute on a wrapper element:
        // Assume you wrap the ::before content in a <div> named '.progress-line' in HTML.
        
        // Since we can't style a pseudo-element directly with JS,
        // we'll modify the CSS to use an inner div:
        // (Modify HTML structure in skills-details):
        // <div class="skill-bar"> 
        //   ...
        //   <div class="progress-line" style="width: 0;"></div> 
        // </div>

        // If keeping the CSS pseudo-element approach:
        const progressLine = bar; // The .skill-bar itself in this CSS structure
        
        // Set the custom property or class that drives the width animation 
        // (The CSS uses the ::before element, which is hard to target in JS).
        // Best approach is to modify the CSS to use an inner div, OR:
        
        // **EASIEST SOLUTION: Use an inline style attribute update on the parent div**
        // In the CSS (1.3), change:
        // .skill-bar::before { width: 0; ... }
        // TO an inner element like this:
        
        // **Assuming you change the HTML structure to:**
        // <div class="skill-bar"> 
        //   <div class="topic">HTML</div><div class="per">90%</div> 
        //   <div class="progress-line"></div> 
        // </div>
        
        // And CSS for .progress-line:
        // .progress-line { height: 100%; background: var(--primary-color); border-radius: 5px; transition: width 1.5s ease-in-out; }
        
        // The JS would be:
        const progressLine = bar.querySelector('.progress-line');
        if(progressLine) {
           progressLine.style.width = percentage + '%'; 
        }

        // ---
        // For the provided CSS structure, we will use a Data Attribute (BEST SOLUTION):
        // 1. Add data-percent to the HTML skill-bar: <div class="skill-bar" data-percent="90">
        // 2. JS: bar.style.setProperty('--skill-width', percentage + '%');
        
        // Since we can't change HTML now, let's use a simpler class toggle:
        bar.classList.add('animate-bar');
    });

    skillsAnimated = true;
}

// Intersect Observer to trigger animation when the section comes into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, { threshold: 0.2 }); // Trigger when 20% of the section is visible

if (skillSection) {
    observer.observe(skillSection);
}

// -----------------------------------------------------
// 2. Document Ready and Side Nav (Modified existing code)
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // ... existing typing-text function (typeText) remains the same ...
    
    // Side Navigation Menu JS Code (Modified to use the updated class names)
    let body = document.querySelector("body");
    let navBar = document.querySelector(".nav-menu"); // Changed to .nav-menu
    let menuBtn = document.querySelector(".menu-btn");
    let cancelBtn = document.querySelector(".cancel-btn");

    menuBtn.onclick = function() {
        navBar.classList.add("active");
        // Ensure menu button disappears smoothly when nav is open
        // menuBtn.style.opacity = "0"; 
        // menuBtn.style.pointerEvents = "none";
        body.style.overflow = "hidden";
        // scrollBtn handling (if needed)
    }

    cancelBtn.onclick = function() {
        navBar.classList.remove("active");
        // menuBtn.style.opacity = "1";
        // menuBtn.style.pointerEvents = "auto";
        body.style.overflow = "auto";
    }

    // Side Navigation Bar Close While We Click On Navigation Links
    let navLinks = document.querySelectorAll(".nav-list li a"); // Changed selector
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function() {
            navBar.classList.remove("active");
            // menuBtn.style.opacity = "1";
            // menuBtn.style.pointerEvents = "auto";
        });
    }
});

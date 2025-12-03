/*==================== toggle icon navbar ====================*/
// Wait for DOM to be ready before selecting elements
function initMenuToggle() {
    const menu = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menu && navbar) {
        // changing status when the icon get clicked by users
        menu.onclick = () => {
            menu.classList.toggle('bx-x-circle');
            navbar.classList.toggle('active');
        };
    } else {
        // Retry if elements not ready yet
        setTimeout(initMenuToggle, 100);
    }
}

/*==================== scroll sections active link ====================*/
// Variables will be initialized after DOM is ready
let sects = [];
let Links = [];

// Track if we're updating URL from scroll (to prevent infinite loops)
let isUpdatingFromScroll = false;
let lastActiveSection = '';

// Function to update URL hash without triggering scroll
function updateUrlHash(sectionId) {
    if (sectionId && sectionId !== lastActiveSection) {
        lastActiveSection = sectionId;
        // Use replaceState to update URL without adding to history or triggering scroll
        const newUrl = '#' + sectionId;
        if (window.location.hash !== newUrl) {
            isUpdatingFromScroll = true;
            window.history.replaceState(null, null, newUrl);
            // Small delay to ensure the flag is reset
            setTimeout(() => {
                isUpdatingFromScroll = false;
            }, 100);
        }
    }
}

// function to used for keeping track of the active section the
//  users at in their browser's
function initScrollTracking() {
    // select all the sections (Home, Skills, ...) with different class
    sects = document.querySelectorAll('section');
    // select all the links as a in the nav of header 
    Links = document.querySelectorAll('header nav a');
    
    if (sects.length === 0 || Links.length === 0) {
        // Retry if elements not ready yet
        setTimeout(initScrollTracking, 100);
        return;
    }
    
    // Set up scroll handler
    window.onscroll = () => {
        // Skip URL updates if we're in the middle of a programmatic scroll
        if (isUpdatingFromScroll) return;
        
        // iterate every elements in the sects array
        sects.forEach(sec => {
            // set variable for the pixels a user
            //  has scrolled from the top left corner
            let top = window.scrollY;
            // set offset for sec (can subtract any number)
            //  but i found 300 is the best to avoid
            //  delay of changing the active icon
            // Adjust offset for mobile devices
            const isMobile = window.innerWidth <= 768;
            const offsetValue = isMobile ? 150 : 300;
            let sec_offset = sec.offsetTop - offsetValue;
            // pixels that represented height of each sec
            let each_sec_height = sec.offsetHeight;
            // id that represented them in HTML
            let id = sec.getAttribute('id');

            // check whether it is passing edge to a new section
            //  If so, remove current active and change to new
            if (top >= sec_offset && top < sec_offset + each_sec_height) {
                Links.forEach(links => {
                    links.classList.remove('active');
                    const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                });
                
                // Update URL hash to reflect current section
                updateUrlHash(id);
            };
        });

        // remove active of the navbar
        const menu = document.querySelector('#menu-icon');
        const navbar = document.querySelector('.navbar');
        if (menu) menu.classList.remove('bx-x-circle');
        if (navbar) navbar.classList.remove('active');
    };
    
    // Set up navigation link handlers
    Links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    isUpdatingFromScroll = true;
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL immediately
                    window.history.replaceState(null, null, href);
                    lastActiveSection = targetId;
                    // Reset flag after scroll completes
                    setTimeout(() => {
                        isUpdatingFromScroll = false;
                    }, 1000);
                }
            }
        });
    });
}

/*==================== scroll reveal ====================*/
// Wait for ScrollReveal to load
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;
        
        ScrollReveal({
            // Disable reset on mobile to ensure content stays visible once revealed
            // This fixes the issue where contact form might not appear or disappear unexpectedly
            reset: !isMobile, 
            distance: isMobile ? '30px' : '80px', // Reduced distance for mobile
            duration: 2000,
            delay: isMobile ? 200 : 450 // Reduced delay for mobile
        });

        ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
        ScrollReveal().reveal('.home-img, .skills-grid, .contact form', { origin: 'bottom'});
        ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left'});
        ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right'});
    } else {
        // Retry if ScrollReveal not loaded yet
        setTimeout(initScrollReveal, 100);
    }
}

/*==================== typed js ====================*/
// Wait for Typed.js to load
function initTyped() {
    const multipleTextElement = document.querySelector('.multiple-text');
    if (typeof Typed !== 'undefined' && multipleTextElement) {
        const typed = new Typed('.multiple-text', {
            strings: ['Statistics & Computing Student', 'Software & Web Developer', 'AI Enthusiast', 'Technology Enthusiast'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    } else if (multipleTextElement) {
        // Retry if Typed.js not loaded yet
        setTimeout(initTyped, 100);
    }
}

// Initialize everything when DOM is ready
function initAll() {
    initMenuToggle();
    initScrollTracking();
    initScrollReveal();
    initTyped();
    
    // Trigger initial scroll check to set the active section and URL
    // This ensures the URL reflects the current section on page load
    setTimeout(() => {
        // Manually trigger scroll handler to detect initial section
        window.dispatchEvent(new Event('scroll'));
        
        // Handle explicit hash in URL
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1); // Remove the #
            const targetSection = document.getElementById(targetId);
            if (targetSection && Links.length > 0) {
                // Small delay to ensure page is fully loaded
                setTimeout(() => {
                    isUpdatingFromScroll = true;
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update active nav link
                    Links.forEach(links => {
                        links.classList.remove('active');
                        const activeLink = document.querySelector('header nav a[href*=' + targetId + ']');
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    });
                    lastActiveSection = targetId;
                    // Reset flag after scroll completes
                    setTimeout(() => {
                        isUpdatingFromScroll = false;
                    }, 1000);
                }, 200);
            }
        }
    }, 100);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    // DOM already loaded
    initAll();
}


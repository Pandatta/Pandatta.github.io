/*==================== toggle icon navbar ====================*/
// select the menu-icon corresponding to their "id"
let menu = document.querySelector('#menu-icon');
// select the element by its "class"
let navbar = document.querySelector('.navbar');

// changing when the icon get clicked by users
menu.onclick = () => {
    menu.classList.toggle('bx-x-circle');
    navbar.classList.toggle('active');
};

/*==================== scroll sections active link ====================*/
// select all the sections (Home, Skills, ...) with different class
let sects = document.querySelectorAll('section');
// select all the links as a in the nav of header 
let Links = document.querySelectorAll('header nav a')

// function to used for keeping track of the active section the
//  users at in their browser's
window.onscroll = () => {
    // iterate every elements in the sects array
    sects.forEach(sec => {
        // set variable for the pixels a user
        //  has scrolled from the top left corner
        let top = window.scrollY;
        // set offset for sec (can subtract any number)
        //  but i found 300 is the best to avoid
        //  delay of changing the active icon
        let sec_offset = sec.offsetTop - 300;
        // pixels that represented height of each sec
        let each_sec_height = sec.offsetHeight;
        // id that represented them in HTML
        let id = sec.getAttribute('id');

        // check whether it is passing edge to a new section
        //  If so, remove current active and change to new
        if (top >= sec_offset && top < sec_offset + each_sec_height) {
            Links.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        } ;
    });

    // remove active of the navbar
    navbar.classList.remove('active');
};

/*==================== scroll reveal ====================*/
ScrollReveal ({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 450

});

ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact-box',{ origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', { origin : 'ease-in-out'});
ScrollReveal().reveal('.home-content p, .about-content', { origin : 'right'});

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Programmer', 'student in University Of Waterloo', 'Data Scientist', 'Hard-Working'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


/*==================== toggle icon navbar ====================*/
let navbar = document.querySelector('.navbar');

navbar.onclick = () => {
    navbar.classList.toggle('active');
};


/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// This is used for the scroll event and assign the active class to the navbar link
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 200;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };

    });

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
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

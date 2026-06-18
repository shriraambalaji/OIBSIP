const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


const testimonialsData = [
    {
        quote: `"The only workspace where my posture doesn't decay by 3 PM. Truly built with care."`,
        author: "Sarah Jenkins, UX Designer"
    },
    {
        quote: `"Insanely fast internet, brilliant community, and the coffee is better than most local shops."`,
        author: "Marcus Chen, Full-Stack Engineer"
    },
    {
        quote: `"Quiet zones are actually respected here. I get more done in four hours here than all week at home."`,
        author: "Dr. Elena Rostova, Author"
    }
];

let currentIndex = 0;
const quoteEl = document.getElementById('testimonial-quote');
const authorEl = document.getElementById('testimonial-user');
const dotsContainer = document.getElementById('dots-container');


testimonialsData.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => switchTestimonial(index));
    dotsContainer.appendChild(dot);
});


function switchTestimonial(index) {
    currentIndex = index;
    
    // Subtle fade animation effect
    quoteEl.style.opacity = 0;
    authorEl.style.opacity = 0;

    setTimeout(() => {
        quoteEl.textContent = testimonialsData[currentIndex].quote;
        authorEl.textContent = `—— ${testimonialsData[currentIndex].author}`;
        
        quoteEl.style.opacity = 1;
        authorEl.style.opacity = 1;

        // Update active dots
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }, 300);
}


setInterval(() => {
    let nextIndex = (currentIndex + 1) % testimonialsData.length;
    switchTestimonial(nextIndex);
}, 6000);
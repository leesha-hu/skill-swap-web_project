// element variables
const signInModal = document.getElementById('signin-modal');
const signInButton = document.getElementById('btn');

// display signin dialog box 
signInButton.onclick = () => {
    signInModal.style.display = 'flex';
};

// hide signin dialog box on clicking the background
signInModal.onclick = (event) => {
    if (event.target === signInModal) {
        signInModal.style.display = 'none';
    }
};

// slideshow variable 
let slideIndex = 0;

// function to show slides 
function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Hide all slides
    Array.from(slides).forEach(slide => slide.style.display = "none");

    // Remove 'active' class from dots
    Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));

    // Increment slide index
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    // Show current slide and highlight corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Repeat every 5 seconds
    setTimeout(showSlides, 5000);
}

// Start slideshow
showSlides();
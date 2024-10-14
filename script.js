document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it to the console
            console.log('Form submitted!');
            
            // Get form data
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
            
            // Clear the form
            form.reset();
            
            // Show a success message (you can replace this with a more user-friendly notification)
            alert('Thank you for your message! I\'ll get back to you soon.');
        });
    }

    const carouselContainer = document.querySelector('.carousel-container');
    const projects = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    let isAnimationPaused = false;

    // Clone projects for infinite loop
    projects.forEach(project => {
        const clone = project.cloneNode(true);
        carouselContainer.appendChild(clone);
    });

    function pauseAnimation() {
        carouselContainer.style.animationPlayState = 'paused';
        isAnimationPaused = true;
    }

    function resumeAnimation() {
        carouselContainer.style.animationPlayState = 'running';
        isAnimationPaused = false;
    }

    function slideProjects(direction) {
        pauseAnimation();
        const slideAmount = direction * (carouselContainer.offsetWidth / 3);
        carouselContainer.style.transition = 'transform 0.5s ease';
        carouselContainer.style.transform = `translateX(${slideAmount}px)`;

        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            if (direction === 1) {
                carouselContainer.appendChild(carouselContainer.firstElementChild);
            } else {
                carouselContainer.prepend(carouselContainer.lastElementChild);
            }
            carouselContainer.style.transform = 'translateX(0)';
            setTimeout(() => {
                carouselContainer.style.transition = 'transform 0.5s ease';
            }, 50);
        }, 500);
    }

    nextBtn.addEventListener('click', () => slideProjects(-1));
    prevBtn.addEventListener('click', () => slideProjects(1));

    carouselContainer.addEventListener('mouseenter', pauseAnimation);
    carouselContainer.addEventListener('mouseleave', resumeAnimation);

    projects.forEach(project => {
        project.addEventListener('click', () => {
            if (!isAnimationPaused) {
                pauseAnimation();
            } else {
                resumeAnimation();
            }
        });
    });

    var aboutMessage = document.getElementById('about-message');
    var closeBtn = document.getElementById('close-about');

    // Function to show the about message
    window.showAboutMessage = function() {
        if (aboutMessage) {
            aboutMessage.classList.remove('hidden');
        }
    };

    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            aboutMessage.classList.add('hidden');
        });
    }

    // Close the message box if clicked outside
    document.addEventListener('click', function(e) {
        if (aboutMessage && !aboutMessage.contains(e.target) && !aboutMessage.classList.contains('hidden')) {
            aboutMessage.classList.add('hidden');
        }
    });
});

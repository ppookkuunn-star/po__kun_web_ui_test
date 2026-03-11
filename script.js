document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Initial trigger for scroll
    handleScroll();

    // 3. Intersection Observer for Scroll Animations
    // Options for the observer (which part of the screen triggers the animation)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes fully into view
        threshold: 0.15 // Trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the CSS animation
                entry.target.classList.add('visible');
                // Stop observing once animated to avoid re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const elementsToAnimate = document.querySelectorAll('.fade-in-element, .slide-up-element');
    
    elementsToAnimate.forEach((el, index) => {
        // Optional: add slight delays based on order for a cascading effect
        if(el.parentElement.classList.contains('masonry-grid') || el.parentElement.classList.contains('feature-grid')) {
            el.style.transitionDelay = `${(index % 3) * 150}ms`;
        }
        observer.observe(el);
    });

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

/* ==========================================================================
   Pragati Sahayak - Animations JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after reveal if you only want it to animate once
                // observer.unobserve(entry.target);
            } else {
                // Remove to allow repeat animation on scroll up
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Typing Effect Logic - Reset on intersection (optional if you want it to restart)
    // The CSS animation handles the initial typing automatically.
});

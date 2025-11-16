document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined') {
        return;
    }
    
    setupRollingTextAnimations();
    setupMobileMenu();
});

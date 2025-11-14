document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, navbar will show without animations');
        return;
    }
    
    // Hide navbar initially
    gsap.set('.navbar', { opacity: 0 });
    gsap.set('.nav-container', { y: -50, opacity: 0 });
    gsap.set('.logo-svg', { opacity: 0 });
    gsap.set('.nav-item', { y: 20, opacity: 0 });
    gsap.set('.hamburger', { opacity: 0 });
    gsap.set('.mobile-menu-overlay', { y: '-100%', pointerEvents: 'none' });
    
    // Loader animation
    function initLoader() {
        const letters = document.querySelectorAll('.loader-letter');
        const isMobile = window.innerWidth <= 768;
        
        const loaderTl = gsap.timeline({
            onComplete: () => {
                // Grid dissolve - each cell slides down or right
                gsap.to('.loader-letter', {
                    x: isMobile ? '100%' : '0%',
                    y: isMobile ? '0%' : '100%',
                    duration: 0.7,
                    stagger: {
                        each: 0.08,
                        from: 'start'
                    },
                    ease: 'power3.inOut',
                    onComplete: () => {
                        document.querySelector('.loader').style.display = 'none';
                        initAnimations();
                    }
                });
            }
        });
        
        // Grid reveal - letters slide in
        loaderTl.to('.loader-letter', {
            x: isMobile ? '0%' : '0%',
            y: isMobile ? '0%' : '0%',
            duration: 0.8,
            stagger: {
                each: 0.1,
                from: 'start'
            },
            ease: 'power3.out'
        })
        // Fade in letters
        .to('.loader-letter', {
            opacity: 1,
            duration: 0.6,
            stagger: {
                each: 0.08,
                from: 'start'
            },
            ease: 'power2.out'
        }, '-=0.6')
        // Hold
        .to({}, { duration: 0.8 });
    }
    
    function initAnimations() {
        const tl = gsap.timeline();
        
        tl.to('.navbar', {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out'
        })
        .to('.logo-svg', {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        }, '-=0.1')
        .to('.nav-container', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.2')
        .to('.nav-item', {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.hamburger', {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.4');
    }
    
    function setupRollingTextAnimations() {
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        
        navItems.forEach(item => {
            const rollingText = item.querySelector('.rolling-text');
            const text = rollingText.textContent;
            
            const rollingContainer = document.createElement('div');
            rollingContainer.className = 'rolling-container';
            rollingContainer.style.overflow = 'hidden';
            rollingContainer.style.height = '1.2em';
            rollingContainer.style.position = 'relative';
            
            const rollingContent = document.createElement('div');
            rollingContent.className = 'rolling-content';
            rollingContent.style.position = 'relative';
            rollingContent.style.transform = 'translateY(0%)';
            
            const originalSpan = document.createElement('span');
            originalSpan.textContent = text;
            originalSpan.style.display = 'block';
            originalSpan.style.height = '1.2em';
            originalSpan.style.lineHeight = '1.2em';
            
            const duplicateSpan = document.createElement('span');
            duplicateSpan.textContent = text;
            duplicateSpan.style.display = 'block';
            duplicateSpan.style.height = '1.2em';
            duplicateSpan.style.lineHeight = '1.2em';
            
            rollingContent.append(originalSpan, duplicateSpan);
            rollingContainer.appendChild(rollingContent);
            
            rollingText.innerHTML = '';
            rollingText.appendChild(rollingContainer);
            
            let isHovered = false;
            
            item.addEventListener('mouseenter', () => {
                if (isHovered) return;
                isHovered = true;
                gsap.to(rollingContent, {
                    y: -rollingContainer.offsetHeight,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                if (!isHovered) return;
                isHovered = false;
                gsap.to(rollingContent, {
                    y: '0%',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const body = document.body;
        let isMenuOpen = false;
        
        hamburger.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            hamburger.classList.toggle('active');
            
            if (isMenuOpen) {
                // Open menu - slide down from top
                body.style.overflow = 'hidden';
                gsap.to(mobileMenuOverlay, {
                    y: '0%',
                    pointerEvents: 'all',
                    duration: 0.6,
                    ease: 'power3.inOut'
                });
                
                // Animate menu items after overlay starts sliding in
                gsap.fromTo('.mobile-nav-item', {
                    y: 30,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    delay: 0.3
                });
            } else {
                // Close menu - slide up
                body.style.overflow = '';
                
                // Fade out items first
                gsap.to('.mobile-nav-item', {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: 'power2.in'
                });
                
                // Then slide overlay up
                gsap.to(mobileMenuOverlay, {
                    y: '-100%',
                    pointerEvents: 'none',
                    duration: 0.6,
                    ease: 'power3.inOut',
                    delay: 0.2
                });
            }
        });
        
        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                hamburger.classList.remove('active');
                body.style.overflow = '';
                
                gsap.to('.mobile-nav-item', {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: 'power2.in'
                });
                
                gsap.to(mobileMenuOverlay, {
                    y: '-100%',
                    pointerEvents: 'none',
                    duration: 0.6,
                    ease: 'power3.inOut',
                    delay: 0.2
                });
            });
        });
    }
    
    initLoader();
    setupRollingTextAnimations();
    setupMobileMenu();
});
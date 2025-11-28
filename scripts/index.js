document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof gsap === 'undefined') {
        return;
    }
    
    gsap.set('.navbar', { opacity: 0 });
    gsap.set(['.nav-container', '.logo-svg', '.nav-item', '.hamburger'], { opacity: 0 });
    gsap.set('.nav-container', { y: -50 });
    gsap.set('.nav-item', { y: 20 });
    gsap.set('.mobile-menu-overlay', { y: '-100%', pointerEvents: 'none' });
    
    function initLoader() {
        const letters = document.querySelectorAll('.loader-letter');
        const isMobile = window.innerWidth <= 768;
        
        const loaderTl = gsap.timeline({
            onComplete: () => {
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
        .to('.loader-letter', {
            opacity: 1,
            duration: 0.6,
            stagger: {
                each: 0.08,
                from: 'start'
            },
            ease: 'power2.out'
        }, '-=0.6')
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
    
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        
        const navbar = document.querySelector('.navbar');
        
        ScrollTrigger.create({
            trigger: '.content-wrapper',
            start: 'top 100px',
            end: 'bottom top',
            onEnter: () => navbar.classList.add('dark'),
            onLeave: () => navbar.classList.remove('dark'),
            onEnterBack: () => navbar.classList.add('dark'),
            onLeaveBack: () => navbar.classList.remove('dark')
        });
        
        // About title animation
        gsap.from('.about-title', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
        
        // About description animation
        gsap.from('.about-description', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        // About bottom section (name and information)
        gsap.from('.about-tags', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'power2.out'
        });
        
        // Projects button animation
        gsap.from('.projects-btn', {
            scrollTrigger: {
                trigger: '.work-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power2.out'
        });
        
        // Contact section animations - simple Y translation only
        gsap.from('.contact-section .section-title', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.from('.email-link', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            duration: 0.8,
            delay: 0.15,
            ease: 'power2.out'
        });
        
        gsap.from('.contact-divider', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out'
        });
        
        gsap.from('.social-link', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.45,
            ease: 'power2.out'
        });
        
        // Footer animations
        gsap.from('.footer-column', {
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
        
        gsap.from('.footer-copyright', {
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'power2.out'
        });
        
        gsap.from('.about-information', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'power2.out'
        });
        
        gsap.utils.toArray('.section-title').forEach((title) => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
        
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });
        
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }
    
    initLoader();
    setupRollingTextAnimations();
    setupMobileMenu();
    
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
    
    // Activate status dot after loader
    setTimeout(() => {
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.classList.add('active');
        }
    }, 3000);
});

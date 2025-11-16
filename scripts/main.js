document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, navbar will show without animations');
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
    
    function setupRollingTextAnimations() {
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        
        navItems.forEach(item => {
            const rollingText = item.querySelector('.rolling-text');
            const text = rollingText.textContent;
            
            const rollingContainer = document.createElement('div');
            rollingContainer.className = 'rolling-container';
            
            const rollingContent = document.createElement('div');
            rollingContent.className = 'rolling-content';
            
            const createSpan = () => {
                const span = document.createElement('span');
                span.textContent = text;
                span.style.cssText = 'display:block;height:1.2em;line-height:1.2em;color:inherit';
                return span;
            };
            
            const originalSpan = createSpan();
            const duplicateSpan = createSpan();
            
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
        const navbar = document.querySelector('.navbar');
        const body = document.body;
        let isMenuOpen = false;
        
        const closeMenu = () => {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navbar.classList.remove('menu-open');
            body.classList.remove('menu-open');
            
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
        };
        
        hamburger.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            hamburger.classList.toggle('active');
            
            if (isMenuOpen) {
                body.classList.add('menu-open');
                
                navbar.classList.add('menu-open');
                gsap.to(mobileMenuOverlay, {
                    y: '0%',
                    pointerEvents: 'all',
                    duration: 0.6,
                    ease: 'power3.inOut'
                });
                
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
                closeMenu();
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
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
        
        gsap.from('.hero-title', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
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
});
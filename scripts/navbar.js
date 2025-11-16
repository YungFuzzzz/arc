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
    
    if (typeof gsap !== 'undefined') {
        gsap.set(mobileMenuOverlay, { y: '-100%', pointerEvents: 'none' });
    }
    
    const closeMenu = () => {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        navbar.classList.remove('menu-open');
        body.classList.remove('menu-open');
        
        if (typeof gsap !== 'undefined') {
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
        }
    };
    
    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        
        if (isMenuOpen) {
            body.classList.add('menu-open');
            navbar.classList.add('menu-open');
            
            if (typeof gsap !== 'undefined') {
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
            }
        } else {
            closeMenu();
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setupRollingTextAnimations, setupMobileMenu };
}

document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, navbar will show without animations');
        return;
    }
    
    gsap.set('.nav-container', { y: -50, opacity: 0 });
    gsap.set('.logo-svg', { opacity: 0 });
    gsap.set('.nav-item', { y: 20, opacity: 0 });
    
    function initAnimations() {
        const tl = gsap.timeline();
        
        tl.to('.nav-container', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        })
        .to('.nav-item', {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.logo-svg', {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.7');
    }
    
    function setupRollingTextAnimations() {
        const navItems = document.querySelectorAll('.nav-item');
        
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
    
    initAnimations();
    setupRollingTextAnimations();
});
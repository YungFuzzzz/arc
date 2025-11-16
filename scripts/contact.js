document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  setupRollingTextAnimations();
  setupMobileMenu();
  initContactAnimations();
  initImageTrace();
});

function initContactAnimations() {
  const contactLinks = document.querySelectorAll('.contact-link');
  
  if (contactLinks.length > 0 && typeof gsap !== 'undefined') {
    gsap.set(contactLinks, { 
      opacity: 0, 
      y: 60,
      rotationX: -15
    });
    
    gsap.to(contactLinks, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3
    });

    contactLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          '--underline-scale': '1',
          duration: 0.25,
          ease: 'none'
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          '--underline-scale': '0',
          duration: 0.25,
          ease: 'none'
        });
      });
    });
  }
}

function initImageTrace() {
  const imageContainer = document.querySelector('.image-container');
  
  if (!imageContainer) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.className = 'liquid-trail-canvas';
  imageContainer.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const trailPoints = [];
  const maxPoints = 150;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lastRenderTime = 0;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  const colorSchemes = [
    [
      { r: 0, g: 127, b: 95 },
      { r: 30, g: 150, b: 80 },
      { r: 80, g: 180, b: 70 },
      { r: 130, g: 210, b: 60 },
      { r: 180, g: 230, b: 55 },
      { r: 220, g: 245, b: 58 },
      { r: 255, g: 255, b: 63 }
    ],
    [
      { r: 255, g: 123, b: 0 },
      { r: 255, g: 140, b: 20 },
      { r: 255, g: 160, b: 40 },
      { r: 255, g: 180, b: 60 },
      { r: 255, g: 200, b: 80 },
      { r: 255, g: 220, b: 120 },
      { r: 255, g: 234, b: 0 }
    ],
    [
      { r: 117, g: 123, b: 200 },
      { r: 130, g: 140, b: 210 },
      { r: 150, g: 160, b: 220 },
      { r: 170, g: 180, b: 230 },
      { r: 190, g: 200, b: 240 },
      { r: 210, g: 210, b: 250 },
      { r: 224, g: 195, b: 252 }
    ],
    [
      { r: 139, g: 0, b: 0 },
      { r: 180, g: 20, b: 30 },
      { r: 220, g: 50, b: 70 },
      { r: 240, g: 80, b: 110 },
      { r: 250, g: 120, b: 150 },
      { r: 255, g: 160, b: 190 },
      { r: 255, g: 192, b: 203 }
    ],
    [
      { r: 0, g: 119, b: 190 },
      { r: 30, g: 144, b: 200 },
      { r: 60, g: 170, b: 210 },
      { r: 90, g: 195, b: 220 },
      { r: 120, g: 220, b: 230 },
      { r: 150, g: 240, b: 240 },
      { r: 175, g: 255, b: 255 }
    ],
    [
      { r: 34, g: 139, b: 34 },
      { r: 60, g: 160, b: 60 },
      { r: 90, g: 180, b: 90 },
      { r: 120, g: 200, b: 120 },
      { r: 150, g: 220, b: 150 },
      { r: 180, g: 240, b: 180 },
      { r: 210, g: 255, b: 210 }
    ],
    [
      { r: 255, g: 69, b: 0 },
      { r: 255, g: 100, b: 50 },
      { r: 255, g: 130, b: 100 },
      { r: 255, g: 160, b: 150 },
      { r: 255, g: 180, b: 180 },
      { r: 255, g: 105, b: 180 },
      { r: 255, g: 20, b: 147 }
    ],
    [
      { r: 65, g: 105, b: 225 },
      { r: 80, g: 130, b: 235 },
      { r: 100, g: 155, b: 245 },
      { r: 120, g: 180, b: 255 },
      { r: 140, g: 200, b: 255 },
      { r: 160, g: 220, b: 255 },
      { r: 135, g: 206, b: 250 }
    ],
    [
      { r: 46, g: 125, b: 50 },
      { r: 60, g: 150, b: 80 },
      { r: 80, g: 175, b: 110 },
      { r: 100, g: 200, b: 140 },
      { r: 120, g: 220, b: 170 },
      { r: 140, g: 240, b: 200 },
      { r: 175, g: 238, b: 238 }
    ],
    [
      { r: 128, g: 0, b: 32 },
      { r: 150, g: 30, b: 60 },
      { r: 180, g: 60, b: 90 },
      { r: 210, g: 100, b: 120 },
      { r: 230, g: 140, b: 150 },
      { r: 250, g: 180, b: 170 },
      { r: 255, g: 215, b: 185 }
    ],
    [
      { r: 0, g: 128, b: 128 },
      { r: 30, g: 150, b: 150 },
      { r: 60, g: 175, b: 175 },
      { r: 90, g: 200, b: 200 },
      { r: 120, g: 220, b: 220 },
      { r: 150, g: 240, b: 240 },
      { r: 175, g: 255, b: 255 }
    ],
    [
      { r: 139, g: 0, b: 139 },
      { r: 160, g: 30, b: 160 },
      { r: 180, g: 60, b: 180 },
      { r: 200, g: 100, b: 200 },
      { r: 220, g: 140, b: 220 },
      { r: 240, g: 180, b: 240 },
      { r: 255, g: 220, b: 255 }
    ],
    [
      { r: 205, g: 127, b: 50 },
      { r: 215, g: 145, b: 70 },
      { r: 225, g: 165, b: 90 },
      { r: 235, g: 185, b: 110 },
      { r: 245, g: 205, b: 130 },
      { r: 250, g: 220, b: 150 },
      { r: 255, g: 235, b: 170 }
    ],
    [
      { r: 75, g: 0, b: 130 },
      { r: 95, g: 30, b: 150 },
      { r: 115, g: 60, b: 170 },
      { r: 135, g: 90, b: 190 },
      { r: 155, g: 120, b: 210 },
      { r: 175, g: 150, b: 230 },
      { r: 195, g: 180, b: 250 }
    ],
    [
      { r: 255, g: 127, b: 80 },
      { r: 255, g: 140, b: 100 },
      { r: 255, g: 155, b: 120 },
      { r: 255, g: 170, b: 140 },
      { r: 255, g: 185, b: 160 },
      { r: 255, g: 200, b: 180 },
      { r: 255, g: 218, b: 185 }
    ]
  ];

  const selectedSchemeIndex = Math.floor(Math.random() * colorSchemes.length);
  const selectedScheme = colorSchemes[selectedSchemeIndex];

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const lastPoint = trailPoints[trailPoints.length - 1];
    const distance = lastPoint ? 
      Math.sqrt((mouseX - lastPoint.x) ** 2 + (mouseY - lastPoint.y) ** 2) : 0;
    
    if (!lastPoint || distance > 5) {
      trailPoints.push({
        x: mouseX,
        y: mouseY,
        time: Date.now(),
        life: 1.0
      });
    }

    if (trailPoints.length > maxPoints) {
      trailPoints.splice(0, trailPoints.length - maxPoints);
    }
  });

  function animate() {
    const currentTime = Date.now();
    
    if (currentTime - lastRenderTime < frameInterval) {
      requestAnimationFrame(animate);
      return;
    }
    lastRenderTime = currentTime;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    
    for (let i = trailPoints.length - 1; i >= 0; i--) {
      const point = trailPoints[i];
      const age = currentTime - point.time;
      const maxAge = 2500;
      
      const fadeProgress = age / maxAge;
      if (fadeProgress < 0.6) {
        point.life = 1.0;
      } else {
        const quickFadeProgress = (fadeProgress - 0.6) / 0.4;
        point.life = Math.max(0, Math.pow(1 - quickFadeProgress, 2.5));
      }
      
      if (point.life <= 0.01) {
        trailPoints.splice(i, 1);
        continue;
      }

      const progress = i / trailPoints.length;
      const colorIndex = Math.floor(progress * (selectedScheme.length - 1));
      const colorProgress = (progress * (selectedScheme.length - 1)) % 1;
      
      const color1 = selectedScheme[colorIndex] || selectedScheme[0];
      const color2 = selectedScheme[colorIndex + 1] || selectedScheme[selectedScheme.length - 1];
      
      const r = Math.round(color1.r + (color2.r - color1.r) * colorProgress);
      const g = Math.round(color1.g + (color2.g - color1.g) * colorProgress);
      const b = Math.round(color1.b + (color2.b - color1.b) * colorProgress);
      
      const size = (45 + progress * 75) * point.life;
      const opacity = Math.pow(point.life, 0.6) * 0.8;
      
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, size
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${opacity * 0.7})`);
      gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

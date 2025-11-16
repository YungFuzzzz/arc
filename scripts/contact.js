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
      { r: 20, g: 40, b: 80 },
      { r: 25, g: 55, b: 100 },
      { r: 30, g: 70, b: 120 },
      { r: 35, g: 90, b: 145 },
      { r: 45, g: 115, b: 175 },
      { r: 60, g: 145, b: 210 },
      { r: 80, g: 180, b: 240 }
    ],
    [
      { r: 100, g: 50, b: 120 },
      { r: 120, g: 60, b: 130 },
      { r: 145, g: 75, b: 145 },
      { r: 170, g: 90, b: 160 },
      { r: 195, g: 110, b: 180 },
      { r: 220, g: 135, b: 205 },
      { r: 240, g: 165, b: 230 }
    ],
    [
      { r: 40, g: 80, b: 100 },
      { r: 50, g: 100, b: 120 },
      { r: 60, g: 125, b: 145 },
      { r: 75, g: 150, b: 170 },
      { r: 95, g: 180, b: 195 },
      { r: 120, g: 210, b: 220 },
      { r: 150, g: 235, b: 240 }
    ],
    [
      { r: 180, g: 60, b: 120 },
      { r: 190, g: 70, b: 130 },
      { r: 205, g: 85, b: 145 },
      { r: 220, g: 100, b: 160 },
      { r: 235, g: 120, b: 180 },
      { r: 245, g: 145, b: 205 },
      { r: 255, g: 175, b: 230 }
    ],
    [
      { r: 80, g: 120, b: 180 },
      { r: 95, g: 135, b: 190 },
      { r: 115, g: 155, b: 205 },
      { r: 140, g: 175, b: 220 },
      { r: 170, g: 195, b: 235 },
      { r: 200, g: 215, b: 245 },
      { r: 230, g: 235, b: 255 }
    ],
    [
      { r: 60, g: 110, b: 100 },
      { r: 70, g: 130, b: 115 },
      { r: 85, g: 155, b: 135 },
      { r: 105, g: 180, b: 155 },
      { r: 130, g: 205, b: 180 },
      { r: 160, g: 225, b: 205 },
      { r: 195, g: 245, b: 230 }
    ],
    [
      { r: 60, g: 40, b: 100 },
      { r: 75, g: 55, b: 120 },
      { r: 95, g: 70, b: 145 },
      { r: 120, g: 90, b: 170 },
      { r: 150, g: 115, b: 200 },
      { r: 185, g: 145, b: 225 },
      { r: 220, g: 180, b: 245 }
    ],
    [
      { r: 140, g: 60, b: 90 },
      { r: 160, g: 75, b: 105 },
      { r: 180, g: 95, b: 125 },
      { r: 200, g: 115, b: 145 },
      { r: 220, g: 140, b: 170 },
      { r: 235, g: 170, b: 195 },
      { r: 250, g: 205, b: 225 }
    ],
    [
      { r: 80, g: 120, b: 60 },
      { r: 95, g: 140, b: 75 },
      { r: 115, g: 165, b: 95 },
      { r: 140, g: 190, b: 120 },
      { r: 170, g: 215, b: 150 },
      { r: 205, g: 235, b: 185 },
      { r: 235, g: 250, b: 220 }
    ],
    [
      { r: 100, g: 80, b: 140 },
      { r: 120, g: 95, b: 160 },
      { r: 145, g: 115, b: 185 },
      { r: 170, g: 140, b: 210 },
      { r: 200, g: 170, b: 230 },
      { r: 225, g: 200, b: 245 },
      { r: 245, g: 230, b: 255 }
    ],
    [
      { r: 180, g: 90, b: 60 },
      { r: 195, g: 105, b: 75 },
      { r: 215, g: 125, b: 95 },
      { r: 230, g: 150, b: 120 },
      { r: 240, g: 180, b: 150 },
      { r: 250, g: 210, b: 185 },
      { r: 255, g: 235, b: 220 }
    ],
    [
      { r: 40, g: 60, b: 120 },
      { r: 55, g: 80, b: 140 },
      { r: 75, g: 105, b: 165 },
      { r: 100, g: 135, b: 190 },
      { r: 130, g: 165, b: 215 },
      { r: 165, g: 195, b: 235 },
      { r: 200, g: 225, b: 250 }
    ],
    [
      { r: 120, g: 80, b: 140 },
      { r: 140, g: 95, b: 160 },
      { r: 165, g: 115, b: 185 },
      { r: 190, g: 140, b: 210 },
      { r: 215, g: 170, b: 230 },
      { r: 235, g: 200, b: 245 },
      { r: 250, g: 220, b: 255 }
    ],
    [
      { r: 60, g: 140, b: 120 },
      { r: 75, g: 160, b: 140 },
      { r: 95, g: 185, b: 165 },
      { r: 120, g: 210, b: 190 },
      { r: 150, g: 230, b: 215 },
      { r: 185, g: 245, b: 235 },
      { r: 220, g: 255, b: 250 }
    ],
    [
      { r: 140, g: 100, b: 160 },
      { r: 160, g: 120, b: 180 },
      { r: 185, g: 145, b: 205 },
      { r: 210, g: 170, b: 225 },
      { r: 230, g: 195, b: 240 },
      { r: 245, g: 215, b: 250 },
      { r: 255, g: 235, b: 255 }
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

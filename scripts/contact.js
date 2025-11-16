// Contact page JavaScript
// Initialize GSAP plugins
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  console.log('Contact page loaded');
  initContactAnimations();
  initImageTrace();
});

// Contact page animations
function initContactAnimations() {
  // Contact links animation with stagger effect
  const contactLinks = document.querySelectorAll('.contact-link');
  
  if (contactLinks.length > 0 && typeof gsap !== 'undefined') {
    // Set initial state
    gsap.set(contactLinks, { opacity: 0, y: 40 });
    
    // Animate in
    gsap.to(contactLinks, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.3
    });
  }
}

// Liquid trace functionality
function initImageTrace() {
  const imageContainer = document.querySelector('.image-container');
  
  if (!imageContainer) {
    console.log('Image container not found');
    return;
  }

  // Create canvas for liquid trail
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.className = 'liquid-trail-canvas';
  imageContainer.appendChild(canvas);

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Trail points array
  const trailPoints = [];
  const maxPoints = 150; // Increased for smoother trail
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lastRenderTime = 0;
  const targetFPS = 60; // Smoother at 60fps
  const frameInterval = 1000 / targetFPS;

  // Color schemes - randomly selected on page load
  const colorSchemes = [
    // Scheme 1: Deep Ocean to Electric Cyan
    [
      { r: 0, g: 20, b: 40 },       // Deep ocean
      { r: 0, g: 60, b: 100 },      
      { r: 0, g: 100, b: 150 },     
      { r: 0, g: 150, b: 200 },     
      { r: 30, g: 200, b: 255 },    
      { r: 100, g: 230, b: 255 },   
      { r: 150, g: 255, b: 255 }    // Bright cyan
    ],
    // Scheme 2: Sunset Dream
    [
      { r: 120, g: 0, b: 120 },     // Deep purple
      { r: 150, g: 30, b: 100 },    
      { r: 200, g: 50, b: 80 },     
      { r: 255, g: 100, b: 60 },    // Coral
      { r: 255, g: 150, b: 50 },    
      { r: 255, g: 200, b: 80 },    
      { r: 255, g: 240, b: 120 }    // Warm yellow
    ],
    // Scheme 3: Aurora Borealis
    [
      { r: 10, g: 50, b: 80 },      // Night blue
      { r: 30, g: 100, b: 150 },    
      { r: 50, g: 180, b: 180 },    // Teal
      { r: 100, g: 220, b: 180 },   
      { r: 150, g: 255, b: 150 },   // Mint green
      { r: 200, g: 255, b: 200 },   
      { r: 230, g: 255, b: 230 }    // Pale mint
    ],
    // Scheme 4: Neon Nights
    [
      { r: 255, g: 0, b: 150 },     // Hot pink
      { r: 255, g: 50, b: 200 },    
      { r: 200, g: 100, b: 255 },   // Purple
      { r: 150, g: 100, b: 255 },   
      { r: 100, g: 150, b: 255 },   
      { r: 50, g: 200, b: 255 },    
      { r: 0, g: 255, b: 255 }      // Cyan
    ],
    // Scheme 5: Fire & Ice
    [
      { r: 0, g: 150, b: 255 },     // Ice blue
      { r: 100, g: 200, b: 255 },   
      { r: 200, g: 220, b: 255 },   
      { r: 255, g: 200, b: 200 },   
      { r: 255, g: 150, b: 100 },   
      { r: 255, g: 100, b: 50 },    
      { r: 255, g: 50, b: 0 }       // Flame
    ],
    // Scheme 6: Tropical Paradise
    [
      { r: 0, g: 100, b: 150 },     // Ocean blue
      { r: 0, g: 150, b: 180 },     
      { r: 50, g: 200, b: 150 },    // Turquoise
      { r: 100, g: 255, b: 150 },   
      { r: 150, g: 255, b: 100 },   
      { r: 200, g: 255, b: 100 },   
      { r: 255, g: 255, b: 100 }    // Bright yellow
    ],
    // Scheme 7: Galaxy Dreams
    [
      { r: 20, g: 0, b: 50 },       // Deep space
      { r: 60, g: 20, b: 100 },     
      { r: 100, g: 50, b: 150 },    // Purple
      { r: 150, g: 80, b: 200 },    
      { r: 200, g: 120, b: 255 },   
      { r: 230, g: 170, b: 255 },   
      { r: 255, g: 220, b: 255 }    // Lavender
    ],
    // Scheme 8: Cherry Blossom
    [
      { r: 100, g: 0, b: 80 },      // Deep pink
      { r: 150, g: 50, b: 120 },    
      { r: 200, g: 100, b: 150 },   
      { r: 255, g: 150, b: 180 },   // Rose
      { r: 255, g: 180, b: 200 },   
      { r: 255, g: 210, b: 220 },   
      { r: 255, g: 240, b: 245 }    // Soft pink
    ],
    // Scheme 9: Electric Lime
    [
      { r: 0, g: 100, b: 0 },       // Forest green
      { r: 50, g: 150, b: 50 },     
      { r: 100, g: 200, b: 50 },    
      { r: 150, g: 255, b: 50 },    // Lime
      { r: 200, g: 255, b: 100 },   
      { r: 230, g: 255, b: 150 },   
      { r: 255, g: 255, b: 200 }    // Pale yellow
    ],
    // Scheme 10: Royal Velvet
    [
      { r: 50, g: 0, b: 100 },      // Deep purple
      { r: 100, g: 20, b: 150 },    
      { r: 150, g: 50, b: 200 },    
      { r: 200, g: 100, b: 230 },   // Violet
      { r: 220, g: 150, b: 255 },   
      { r: 240, g: 200, b: 255 },   
      { r: 255, g: 230, b: 255 }    // Soft lavender
    ],
    // Scheme 11: Golden Hour
    [
      { r: 150, g: 50, b: 0 },      // Deep orange
      { r: 200, g: 80, b: 0 },      
      { r: 255, g: 120, b: 0 },     // Orange
      { r: 255, g: 160, b: 50 },    
      { r: 255, g: 200, b: 100 },   
      { r: 255, g: 230, b: 150 },   
      { r: 255, g: 250, b: 200 }    // Warm cream
    ],
    // Scheme 12: Candy Pop
    [
      { r: 255, g: 0, b: 200 },     // Magenta
      { r: 255, g: 80, b: 220 },    
      { r: 255, g: 120, b: 255 },   // Pink purple
      { r: 220, g: 150, b: 255 },   
      { r: 180, g: 180, b: 255 },   
      { r: 200, g: 220, b: 255 },   
      { r: 230, g: 240, b: 255 }    // Baby blue
    ],
    // Scheme 13: Fresh Mint
    [
      { r: 0, g: 150, b: 136 },     // Teal
      { r: 50, g: 180, b: 160 },    
      { r: 80, g: 210, b: 180 },    
      { r: 120, g: 240, b: 200 },   // Mint
      { r: 160, g: 255, b: 220 },   
      { r: 200, g: 255, b: 235 },   
      { r: 230, g: 255, b: 245 }    // Ice mint
    ],
    // Scheme 14: Cosmic Berry
    [
      { r: 100, g: 0, b: 150 },     // Deep purple
      { r: 150, g: 0, b: 180 },     
      { r: 200, g: 50, b: 200 },    // Magenta purple
      { r: 255, g: 80, b: 180 },    
      { r: 255, g: 120, b: 150 },   
      { r: 255, g: 160, b: 180 },   
      { r: 255, g: 200, b: 220 }    // Rose quartz
    ],
    // Scheme 15: Arctic Sky
    [
      { r: 50, g: 100, b: 150 },    // Steel blue
      { r: 80, g: 150, b: 200 },    
      { r: 120, g: 200, b: 240 },   // Sky blue
      { r: 160, g: 230, b: 255 },   
      { r: 200, g: 245, b: 255 },   
      { r: 230, g: 250, b: 255 },   
      { r: 245, g: 255, b: 255 }    // Ice white
    ]
  ];

  // Randomly select a color scheme
  const selectedScheme = Math.floor(Math.random() * colorSchemes.length);
  const colors = colorSchemes[selectedScheme];
  
  console.log(`Selected color scheme: ${selectedScheme + 1}`); // Debug log

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add points more frequently for smoother trail
    const lastPoint = trailPoints[trailPoints.length - 1];
    const distance = lastPoint ? 
      Math.sqrt((mouseX - lastPoint.x) ** 2 + (mouseY - lastPoint.y) ** 2) : 0;
    
    // Lower threshold for more fluid motion
    if (!lastPoint || distance > 5) {
      trailPoints.push({
        x: mouseX,
        y: mouseY,
        time: Date.now(),
        life: 1.0
      });
    }

    // Remove old points
    if (trailPoints.length > maxPoints) {
      trailPoints.splice(0, trailPoints.length - maxPoints);
    }
  });

  // Animation loop with FPS limiting
  function animate() {
    const currentTime = Date.now();
    
    // Limit frame rate for better performance
    if (currentTime - lastRenderTime < frameInterval) {
      requestAnimationFrame(animate);
      return;
    }
    lastRenderTime = currentTime;
    
    // Clear canvas completely for bright colors
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';

    // Update and draw trail points
    
    for (let i = trailPoints.length - 1; i >= 0; i--) {
      const point = trailPoints[i];
      const age = currentTime - point.time;
      const maxAge = 2500; // Slightly faster fade for more dynamic feel
      
      // Smoother fade curve
      const fadeProgress = age / maxAge;
      if (fadeProgress < 0.6) {
        // Stay visible for 60% of lifetime
        point.life = 1.0;
      } else {
        // Smooth exponential fade in last 40%
        const quickFadeProgress = (fadeProgress - 0.6) / 0.4;
        point.life = Math.max(0, Math.pow(1 - quickFadeProgress, 2.5)); // Smoother fade
      }
      
      if (point.life <= 0.01) {
        trailPoints.splice(i, 1);
        continue;
      }

      // Calculate color based on position in trail
      const progress = i / trailPoints.length;
      const colorIndex = Math.floor(progress * (colors.length - 1));
      const colorProgress = (progress * (colors.length - 1)) % 1;
      
      const color1 = colors[colorIndex] || colors[0];
      const color2 = colors[colorIndex + 1] || colors[colors.length - 1];
      
      // Smooth interpolation between colors
      const r = Math.round(color1.r + (color2.r - color1.r) * colorProgress);
      const g = Math.round(color1.g + (color2.g - color1.g) * colorProgress);
      const b = Math.round(color1.b + (color2.b - color1.b) * colorProgress);
      
      // Draw smooth liquid blob
      const size = (45 + progress * 75) * point.life; // Larger range for more fluid look
      const opacity = Math.pow(point.life, 0.6) * 0.8; // Higher opacity for more vibrant colors
      
      // Smoother gradient with more stops
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

  animate();
}
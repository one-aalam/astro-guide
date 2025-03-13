<script>
    import { onMount, onDestroy } from 'svelte';
    import WelcomeMessageMinimal from '../islands/WelcomeMessageMinimal.svelte';
    
    let canvas;
    let ctx;
    let particles = [];
    let animationFrame;
    
    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight * 0.7;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 0.7 - 0.4;
        this.color = `rgba(${Math.floor(Math.random() * 50 + 180)}, ${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.3 + 0.2})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight * 0.7;
        if (this.y > window.innerHeight * 0.7) this.y = 0;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.08), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
      initParticles();
    }
    
    onMount(() => {
      if (!canvas) return;
      
      ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
      
      initParticles();
      animate();
      
      window.addEventListener('resize', handleResize);
    });
    
    onDestroy(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('resize', handleResize);
    });
  </script>

<div class="banner flex flex-col justify-center items-center dark:text-gray-50 h-screen max-h-[700px] overflow-hidden">
  <div class="banner__cover bg-gradient-to-t from-gray-200 dark:from-gray-800 to-gray-800 dark:to-gray-200 flex items-end overflow-hidden justify-center w-64 h-64 rounded-full absolute -top-36 p-2">
  </div>
  <canvas 
      bind:this={canvas} 
      class="absolute inset-0 w-full h-full pointer-events-none"
    ></canvas>
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 class="text-5xl md:text-9xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-primary to-dark-secondary dark:from-dark-secondary dark:to-primary">
        Stay Curious!
      </h1>
      
      <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
        Guides on the latest and best tech out there, to take you from zero to hero.
      </p>
      <!-- <WelcomeMessageMinimal class="text-left" typewriterText="Guides on the latest and best tech out there, to take you from zero to hero."/> -->
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/guides" 
          class="inline-flex items-center justify-center text-white dark:text-gray-50 px-6 py-3 bg-gradient-to-br from-primary to-dark-secondary dark:from-dark-secondary dark:to-primary shadow-primary border-primary dark:border-dark-primary rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <span class="mr-2 ">Explore Guides</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
        
        <!-- <a 
          href="/search" 
          class="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span>Search Content</span>
        </a> -->
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>

  </div>
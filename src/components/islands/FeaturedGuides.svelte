<script>
    import { onMount } from 'svelte';
    
    export let guides = []; // Provide your actual guides data
    let currentIndex = 0;
    let interval;
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % guides.length;
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + guides.length) % guides.length;
    }
    
    function setSlide(index) {
      currentIndex = index;
    }
    
    onMount(() => {
      // Auto-advance carousel
      interval = setInterval(nextSlide, 5000);
      
      return () => clearInterval(interval);
    });
  </script>
  
  <section class="py-16 bg-gray-50 dark:bg-gray-900/50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">
        Popular Guides
      </h2>
      
      <div class="relative max-w-4xl mx-auto">
        <!-- Carousel -->
        <div class="overflow-hidden rounded-xl shadow-lg">
          {#each guides as guide, i}
            <div 
              class="transition-all duration-500 ease-in-out absolute inset-0"
              style="transform: translateX({(i - currentIndex) * 100}%); opacity: {i === currentIndex ? 1 : 0};"
            >
              <div class="h-full bg-white dark:bg-gray-800 p-6 flex flex-col md:flex-row items-center">
                <div class="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                  <div class="text-sm font-medium text-primary-500 mb-2">
                    {guide.category}
                  </div>
                  <h3 class="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {guide.title}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    {guide.description}
                  </p>
                  <a 
                    href={`/guides/${guide.slug}`} 
                    class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Read guide
                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
                <div class="md:w-1/2">
                  <div class="rounded-lg overflow-hidden shadow-md relative group">
                    <img 
                      src={guide.thumbImagePath || '/images/placeholder.png'} 
                      alt={guide.title}
                      class="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
        
        <!-- Navigation buttons -->
        <button 
          class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md z-10 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          on:click={prevSlide}
          aria-label="Previous slide"
        >
          <svg class="w-5 h-5 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md z-10 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          on:click={nextSlide}
          aria-label="Next slide"
        >
          <svg class="w-5 h-5 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <!-- Dots -->
        <div class="flex justify-center mt-4">
          {#each guides as _, i}
            <button 
              class="w-2 h-2 mx-1 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-primary-600 dark:bg-primary-400 w-4' : 'bg-gray-300 dark:bg-gray-600'}"
              on:click={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          {/each}
        </div>
      </div>
    </div>
  </section>
<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { fade, fly, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    
    // Define heading type
    interface Heading {
      depth: number;
      slug: string;
      text: string;
    }
    
    // Props
    export let headings: Heading[] = [];
    export let activeId: string = '';
    export let maxDepth: number = 3;
    
    // State variables
    let isMobile: boolean = false;
    let isTocOpen: boolean = false;
    let observer: IntersectionObserver;
    let readingProgress: number = 0;
    let container: HTMLElement;
    let lastScrollY: number = 0;
    let ticking: boolean = false;
    
    $: filteredHeadings = headings.filter(heading => heading.depth <= maxDepth);
    
    // Update active heading based on scroll position
    function updateActiveHeading() {
      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            // Find headings that are visible
            const visibleHeadings = entries
              .filter(entry => entry.isIntersecting)
              .map(entry => entry.target.id);
              
            if (visibleHeadings.length > 0) {
              // Use the first visible heading as active
              activeId = visibleHeadings[0];
            }
          },
          { rootMargin: '-100px 0px -80% 0px' }
        );
        
        // Observe all headings
        document.querySelectorAll('h2, h3, h4, h5, h6').forEach(heading => {
          if (heading.id) {
            observer.observe(heading);
          }
        });
      }
    }
    
    // Calculate reading progress
    function calculateReadingProgress() {
      if (!ticking) {
        ticking = true;
        
        requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPosition = window.scrollY;
          readingProgress = Math.min(Math.max(scrollPosition / docHeight, 0), 1);
          
          ticking = false;
        });
      }
    }
    
    // Check if the device is mobile
    function checkMobile() {
      isMobile = window.innerWidth < 768;
    }
    
    // Toggle TOC on mobile
    function toggleToc() {
      isTocOpen = !isTocOpen;
    }
    
    // Scroll to heading
    async function scrollToHeading(slug: string) {
      const element = document.getElementById(slug);
      if (element) {
        // Close the mobile TOC after clicking
        if (isMobile) {
          isTocOpen = false;
          // Wait for animation to complete before scrolling
          await tick();
        }
        
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Update URL hash without scrolling
        history.pushState(null, '', `#${slug}`);
        
        // Update active id
        activeId = slug;
      }
    }
    
    // Setup on mount
    onMount(() => {
      checkMobile();
      updateActiveHeading();
      calculateReadingProgress();
      
      // Initial check for active heading from URL
      if (window.location.hash) {
        activeId = window.location.hash.substring(1);
      }
      
      // Event listeners
      window.addEventListener('resize', checkMobile);
      window.addEventListener('scroll', calculateReadingProgress);
      
      return () => {
        // Cleanup
        if (observer) {
          observer.disconnect();
        }
        window.removeEventListener('resize', checkMobile);
        window.removeEventListener('scroll', calculateReadingProgress);
      };
    });
    
    // Get heading indent based on depth
    function getIndent(depth: number): string {
      const baseDepth = Math.min(...filteredHeadings.map(h => h.depth));
      const indent = (depth - baseDepth) * 12;
      return `${indent}px`;
    }
  </script>
  
  <!-- Desktop TOC -->
  {#if !isMobile}
    <div 
      bind:this={container} 
      class="toc-container hidden md:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-4"
      transition:fade={{ duration: 200 }}
    >
      <div class="font-medium text-sm mb-3 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        Table of Contents
      </div>
      
      <nav class="toc-nav">
        <ul class="space-y-2 text-sm">
          {#each filteredHeadings as heading, i}
            <li 
              style="padding-left: {getIndent(heading.depth)}"
              class="transition-all duration-200 ease-in-out"
            >
              <a 
                href="#{heading.slug}" 
                class="toc-link block py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200
                  {activeId === heading.slug ? 
                    'text-primary-600 dark:text-primary-400 font-medium' : 
                    'text-gray-700 dark:text-gray-300'}"
                on:click|preventDefault={() => scrollToHeading(heading.slug)}
              >
                {heading.text}
                
                <!-- Active indicator -->
                {#if activeId === heading.slug}
                  <div 
                    class="absolute left-0 w-1 bg-primary-600 dark:bg-primary-400 rounded-r"
                    style="height: 1.5rem; transform: translateY(-50%); top: 50%;"
                    in:fade={{ duration: 200 }}
                  ></div>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  {:else}
    <!-- Mobile Floating TOC -->
    <div class="fixed bottom-6 right-0 md:hidden z-50 flex flex-col items-end">
      <!-- Progress bar and current section when collapsed -->
      <button 
        class="toc-mobile-button flex items-center bg-white/90 dark:bg-black/90 border-primary-200 dark:border-primary-700 rounded-tl-full rounded-bl-full shadow-lg p-3 mb-2 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out"
        class:expanded={isTocOpen}
        on:click={toggleToc}
        aria-expanded={isTocOpen}
        aria-label={isTocOpen ? "Close table of contents" : "Open table of contents"}
      >
      {#if !isTocOpen}
        <!-- Reading progress circle -->
        <div class="relative w-6 h-6 mr-2 border-r pr-8 border-gray-200 dark:border-gray-700">
          <svg class="w-6 h-6" viewBox="0 0 24 24">
            <!-- Background circle -->
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              fill="none" 
              stroke-width="2" 
              class="stroke-gray-200 dark:stroke-gray-700"
            />
            
            <!-- Progress circle -->
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              fill="none" 
              stroke-width="1"
              stroke-dasharray="62.83" 
              stroke-dashoffset={62.83 * (1 - readingProgress)} 
              transform="rotate(-90 12 12)"
              class="stroke-primary-600 dark:stroke-primary-400 transition-all duration-300 ease-out"
            />
          </svg>
          
          <!-- Percentage in center -->
          <div class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-800 dark:text-gray-200">
            {Math.round(readingProgress * 100)}%
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-of-contents"><path d="M16 12H3"/><path d="M16 18H3"/><path d="M16 6H3"/><path d="M21 12h.01"/><path d="M21 18h.01"/><path d="M21 6h.01"/></svg>
        &nbsp;
      {/if}
        <!-- Current section label (truncated) -->
        {#if activeId && !isTocOpen}
          <div class="max-w-[120px] truncate text-sm font-medium text-gray-800 dark:text-gray-200">
            {filteredHeadings.find(h => h.slug === activeId)?.text || 'Contents'}
          </div>
        {:else}
          <div class="text-sm font-medium text-gray-800 dark:text-gray-200">
            <!-- {isTocOpen ? 'Close' : 'Contents'} -->
            {#if isTocOpen}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            {:else}
                Contents
            {/if}
          </div>
        {/if}
      </button>
      
      <!-- Mobile TOC Overlay -->
      {#if isTocOpen}
        <div 
          class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          on:click={() => isTocOpen = false}
          transition:fade={{ duration: 200 }}
          aria-hidden="true"
        ></div>
        
        <div 
          class="w-[80vw] max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          transition:fly={{ y: 20, duration: 300, easing: quintOut }}
        >
          <div class="p-4">
            <div class="font-medium text-sm mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Table of Contents
            </div>
            
            <nav class="mobile-toc-nav max-h-[60vh] overflow-y-auto pr-2">
              <ul class="space-y-2 text-sm">
                {#each filteredHeadings as heading}
                  <li 
                    style="padding-left: {getIndent(heading.depth)}"
                    class="transition-all duration-200 ease-in-out"
                    transition:slide={{ duration: 150, easing: quintOut }}
                  >
                    <a 
                      href="#{heading.slug}" 
                      class="block py-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200
                        {activeId === heading.slug ? 
                          'text-primary-600 dark:text-primary-400 font-medium' : 
                          'text-gray-700 dark:text-gray-300'}"
                      on:click|preventDefault={() => scrollToHeading(heading.slug)}
                    >
                      <div class="flex items-center">
                        {#if activeId === heading.slug}
                          <div class="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></div>
                        {:else}
                          <div class="w-1.5 h-1.5 mr-2"></div>
                        {/if}
                        <span class="line-clamp-2">{heading.text}</span>
                      </div>
                    </a>
                  </li>
                {/each}
              </ul>
            </nav>
          </div>
        </div>
      {/if}
    </div>
  {/if}
  
  <style>

    @reference "tailwindcss";
    .toc-container {
      width: 260px;
      min-width: 260px;
      font-size: 0.875rem;
    }
    
    .toc-link {
      @apply relative;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    /* Mobile styles */
    .toc-mobile-button {
      transition: transform 0.3s ease, box-shadow 0.2s ease;
    }
    
    .toc-mobile-button:hover {
      @apply shadow-md;
    }
    
    .toc-mobile-button.expanded {
        /* @apply bg-accent border-amber-500; */
      /* @apply bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700; */
    }
    
    .mobile-toc-nav {
      @apply bg-white rounded-lg shadow-inner p-3 mb-2 border border-gray-200;
      scrollbar-width: thin;
      scrollbar-color: theme('colors.gray.300') theme('colors.gray.100');
    }

    :global(.dark) .mobile-toc-nav {
      @apply bg-gray-800 border-gray-700;
    }
    
    .mobile-toc-nav::-webkit-scrollbar {
      width: 4px;
    }
    
    .mobile-toc-nav::-webkit-scrollbar-track {
      @apply bg-gray-100 dark:bg-gray-900 rounded;
    }
    
    .mobile-toc-nav::-webkit-scrollbar-thumb {
      @apply bg-gray-300 dark:bg-gray-700 rounded;
    }
    
    :global(.dark) .toc-link {
      @apply text-gray-300;
    }
  </style>
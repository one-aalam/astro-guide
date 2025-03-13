<script lang="ts">
    import { onMount } from 'svelte';
    
    let scrollY;
    let isScrolled = false;
    let isDarkMode = false;

    let mobileMenu;
    let menuButton;
    let closeButton;

    const NAV_ITEMS = [
        {
            path: '/guides',
            title: 'Guides'
        },
        {
            path: '/about',
            title: 'About'
        },
    ]
    
    // Toggle dark mode
    function toggleDarkMode() {
      isDarkMode = !isDarkMode;
      document.documentElement.classList.toggle('dark', isDarkMode);
      localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');
    }
    
    onMount(() => {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('darkMode');
      isDarkMode = savedTheme === 'dark' || 
        (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDarkMode);
      
      // Add scroll detection
      window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        isScrolled = scrollY > 10;
      });
      
      return () => {
        window.removeEventListener('scroll', () => {});
      };
    });

    onMount(() => {
        mobileMenu = document.getElementById('mobile-menu');
        menuButton = document.querySelector('[aria-label="Open menu"]');
        closeButton = document.querySelector('[aria-label="Close menu"]');
        
        if (menuButton && closeButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
        
        closeButton.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
        }
    });
  </script>
  
  
  <svelte:window bind:scrollY />
  
  <header class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <a href="/" title="Ilm - Stay Curious!" class="flex items-center font-display text-lg dark:text-gray-50 px-2 py-1 shadow-inner">
          <strong class=" font-black">ilm</strong>&nbsp;<span class="inline-block w-2 h-2 bg-primary dark:bg-dark-primary rounded-full"></span>&nbsp;aalam
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          {#each NAV_ITEMS as navItem}
            <a href={navItem.path} title={navItem.title}
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300"
          >
            {navItem.title}
          </a>
          {/each}
          
          <!-- Theme Toggle Button -->
          <button 
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            on:click={toggleDarkMode}
          >
            {#if isDarkMode}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            {/if}
          </button>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  <div class="md:hidden">
    <div id="mobile-menu" class="fixed inset-0 z-50 bg-white dark:bg-gray-900 transform translate-x-full transition-transform duration-300">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <a href="/" class="flex items-center space-x-1 text-gray-900 dark:text-white">
            <strong class=" font-black">ilm</strong>&nbsp;<span class="inline-block w-2 h-2 bg-primary dark:bg-dark-primary rounded-full"></span>&nbsp;aalam
          </a>
          
          <button 
            class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <nav class="flex-1 overflow-y-auto p-4">
          <div class="space-y-3">
            {#each NAV_ITEMS as navItem}
              <a 
                href={navItem.path} 
                class="block py-3 px-4 text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {navItem.title}
              </a>
            {/each}
          </div>
          
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-between px-4">
              <span class="text-gray-600 dark:text-gray-400">Dark Mode</span>
              <button 
                class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                on:click={toggleDarkMode}
              >
                {#if isDarkMode}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                {:else}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                {/if}
              </button>
            </div>
          </div>
        </nav>
        
        <div class="p-4 border-t border-gray-200 dark:border-gray-800">
          <div class="flex space-x-4">
            <a href="https://twitter.com/username" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://github.com/username" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
<style lang="postcss">
  @reference "tailwindcss";
  .nav-item {
      @apply uppercase font-thin py-1 sm:p-4;
  }
  .nav-item--themed {
      @apply  hover:text-gray-800 dark:hover:text-gray-100;
  }
  .nav-item--plain {
      @apply text-gray-100;
  }
  .nav-item--active {
      @apply font-bold underline underline-offset-4;
  }
</style>
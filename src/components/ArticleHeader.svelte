<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    export let title: string
    export let subtitle: string
    export let estimatedReadTime: string
    export let publishDate: string
    export let authorName: string
    export let authorRole: string
</script>

<header class="mb-12">
    <div class="space-y-4 text-center sm:text-left">
      <!-- Title with animated underline -->
      <h1 
        class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white relative inline-block"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        {title}
        <span class="block h-1 bg-primary-500 dark:bg-primary-400 mt-2 w-0 transition-all duration-1000" style="width: 100%;"></span>
      </h1>
      
      <!-- Subtitle -->
      <p 
        class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl"
        in:fade={{ duration: 800, delay: 400 }}
      >
        {subtitle}
      </p>
      
      <!-- Article metadata -->
      <div 
        class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-2"
        in:fade={{ duration: 800, delay: 500 }}
      >
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{estimatedReadTime}</span>
        </div>

        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(publishDate))}</span>
        </div>
        
        <!-- <div class="flex items-center">
          <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 mr-1 font-medium text-xs">
            {authorName.charAt(0)}
          </div>
          <span>{authorName}, {authorRole}</span>
        </div> -->
      </div>
    </div>
  </header>
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  
  export let title = "Overview";
  export let chapters = [];
  
  let activeChapter = null;
  let isInView = false;
  
  onMount(() => {
    // Add a small delay for entrance animation
    setTimeout(() => {
      isInView = true;
    }, 100);
    
    // Initialize with hover on first chapter
    setTimeout(() => {
      activeChapter = chapters[0]?.id;
      setTimeout(() => {
        activeChapter = null;
      }, 2000);
    }, 1000);
  });
  
  function handleChapterHover(id) {
    activeChapter = id;
  }
  
  function handleChapterLeave() {
    activeChapter = null;
  }
</script>
<div class="space-y-3">
    {#if isInView}
      {#each chapters as chapter, i}
        <a 
          href={`#${chapter.id}`}
          class="chapter-card group relative flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-md"
          class:active={activeChapter === chapter.id}
          on:mouseenter={() => handleChapterHover(chapter.id)}
          on:mouseleave={handleChapterLeave}
          in:fly={{ y: 20, delay: i * 100, duration: 300 }}
        >
          <div class="chapter-number flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-5xl font-bold bg-primary-50 dark:bg-primary-900/30 text-gray-400 dark:text-gray-600 mr-4 transition-all duration-300 group-hover:scale-110">
            {i + 1}
          </div>
          
          <div class="flex-1">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {chapter.data.title}
            </h4>
            
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
              {chapter.data.description}
            </p>
          </div>
          
          <div class="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
          
          <!-- Progress indicator when chapter is active -->
          {#if activeChapter === chapter.id}
            <div class="absolute bottom-0 left-0 h-1 bg-primary-500 dark:bg-primary-400 rounded-full" style="width: 0%;" in:fly={{ x: '-100%', duration: 0 }}></div>
          {/if}
        </a>
      {/each}
    {/if}
</div>
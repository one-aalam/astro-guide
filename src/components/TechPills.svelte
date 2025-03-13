<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
    {#each ['React', 'styled-components', 'Prettier', 'GitHub Actions', 'ESLint', 'Chromatic', 'Jest', 'npm', 'Auto'] as tech, i}
      <div 
        class="tech-pill flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-500"
        in:fade={{ delay: i * 80, duration: 300 }}
      >
        <div class="h-8 flex items-center mb-2">
          <div class="w-12 h-1 rounded-full bg-primary-500 dark:bg-primary-400 opacity-75"></div>
        </div>
        <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{tech}</span>
      </div>
    {/each}
</div>
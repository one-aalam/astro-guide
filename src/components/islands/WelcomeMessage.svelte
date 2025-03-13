<script>
    import { onMount } from 'svelte';
    
    let typewriterComplete = false;
    let typewriterElement;
    let typewriterText = "Welcome to a place where curiosity meets technology.";
    let displayedText = "";
    let charIndex = 0;
    
    onMount(() => {
      const typingSpeed = 50; // ms per character
      
      function typeNextChar() {
        if (charIndex < typewriterText.length) {
          displayedText += typewriterText.charAt(charIndex);
          charIndex++;
          setTimeout(typeNextChar, typingSpeed);
        } else {
          typewriterComplete = true;
        }
      }
      
      setTimeout(typeNextChar, 500);
    });
  </script>
  
  <div class="my-12 max-w-2xl mx-auto px-4">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="flex items-start mb-4">
        <div class="flex space-x-1 mr-3">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">terminal@ilm.aalam.in</div>
      </div>
      
      <div class="font-mono text-sm md:text-base text-gray-800 dark:text-gray-200 relative">
        <span class="text-purple-600 dark:text-purple-400">ilm@aalam</span>:<span class="text-blue-600 dark:text-blue-400">~$</span> 
        <span>{displayedText}</span>
        {#if !typewriterComplete}
          <span class="inline-block w-2 h-4 ml-1 bg-gray-700 dark:bg-gray-300 animate-pulse"></span>
        {/if}
      </div>
      
      {#if typewriterComplete}
        <div class="font-mono text-sm md:text-base text-gray-800 dark:text-gray-200 mt-4 opacity-0 animate-[fadeIn_1s_ease_forwards_0.5s]">
          <span class="text-purple-600 dark:text-purple-400">ilm@aalam</span>:<span class="text-blue-600 dark:text-blue-400">~$</span> 
          <span>Let's dive into some amazing tech guides →</span>
        </div>
      {/if}
    </div>
  </div>
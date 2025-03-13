<script>
    import { onMount } from 'svelte';
    
    let typewriterComplete = false;
    let typewriterElement;
    let typewriterText = "Guides on the latest and best tech out there, to take you from zero to hero.";
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
  
<p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
    <span>{displayedText}</span>
    {#if !typewriterComplete}
      <span class="inline-block w-2 h-4 ml-1 bg-gray-700 dark:bg-gray-300 animate-pulse"></span>
    {/if}
      
      <!-- {#if typewriterComplete}
        <div class="font-mono text-sm md:text-base text-gray-800 dark:text-gray-200 mt-4 opacity-0 animate-[fadeIn_1s_ease_forwards_0.5s]">
          <span>Let's dive into some amazing tech guides →</span>

      {/if} -->
</p>
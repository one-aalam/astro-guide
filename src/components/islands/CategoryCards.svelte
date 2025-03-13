<script>
    const categories = [
      { name: 'Web Development', icon: 'code', count: 12, color: 'blue' },
      { name: 'AI & Machine Learning', icon: 'brain', count: 8, color: 'purple' },
      { name: 'DevOps', icon: 'server', count: 6, color: 'green' },
      { name: 'Mobile Development', icon: 'device-mobile', count: 5, color: 'red' }
    ];
    
    function getGradient(color) {
      const gradients = {
        blue: 'from-blue-500 to-indigo-600',
        purple: 'from-purple-500 to-pink-600',
        green: 'from-green-500 to-teal-600',
        red: 'from-red-500 to-orange-600'
      };
      
      return gradients[color] || gradients.blue;
    }
  </script>
  
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">
        Browse by Category
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each categories as category}
          <a 
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class={`absolute inset-0 bg-gradient-to-br ${getGradient(category.color)} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
            
            <div class="relative p-6 flex flex-col h-full min-h-[180px]">
              <div class="flex-1">
                <div class="text-white mb-2 opacity-90 text-4xl">
                  <!-- Icon placeholder (replace with your icon system) -->
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                
                <h3 class="text-xl md:text-2xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                
                <p class="text-white text-opacity-80 text-sm">
                  {category.count} guides
                </p>
              </div>
              
              <div class="mt-4 text-white flex items-center justify-end">
                <span class="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">Explore</span>
                <svg class="w-5 h-5 ml-1 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>
<script>
    export let posts = [];
  </script>
  
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-baseline mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Latest Articles
        </h2>
        <a href="/blog" class="text-primary-600 dark:text-primary-400 hover:underline mt-2 md:mt-0">
          View all articles →
        </a>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each posts as post}
          <article class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <a href={post.slug} class="block">
              <div class="h-48 overflow-hidden">
                <img 
                  src={post.image || '/images/placeholder.png'} 
                  alt={post.title}
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div class="p-6">
                <div class="flex items-center mb-2">
                  <span class="text-xs font-medium px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
                    {post.category}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400 text-sm ml-3">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p class="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                  {post.description}
                </p>
                
                <div class="flex items-center">
                  <img 
                    src={post.author.avatar || '/images/placeholder-avatar.png'} 
                    alt={post.author.name}
                    class="w-8 h-8 rounded-full mr-3"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </a>
          </article>
        {/each}
      </div>
    </div>
  </section>
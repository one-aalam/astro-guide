<section class="py-12 bg-gray-50 dark:bg-gray-900/40">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 p-8 md:p-12">
            <h2 class="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Stay Updated
            </h2>
            
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to our newsletter to receive new guides, updates, and exclusive tech tips.
            </p>
            
            <form class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="you@example.com"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <button 
                  type="submit"
                  class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 transform hover:-translate-y-1"
                >
                  Subscribe
                </button>
              </div>
              
              <p class="text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
          
          <div class="md:w-1/2 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 p-8 md:p-12 flex items-center justify-center">
            <!-- Replace with your own illustration or icon -->
            <div class="w-64 h-64 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-40 h-40 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="absolute top-6 right-6 w-6 h-6 rounded-full bg-yellow-400 animate-ping opacity-75"></div>
              <div class="absolute bottom-10 left-8 w-4 h-4 rounded-full bg-blue-400 animate-ping opacity-75" style="animation-delay: 1s"></div>
              <div class="absolute top-20 left-10 w-5 h-5 rounded-full bg-green-400 animate-ping opacity-75" style="animation-delay: 2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
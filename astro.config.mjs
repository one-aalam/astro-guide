import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
// import { astroCodeSnippets, codeSnippetAutoImport } from './integrations/astro-code-snippets';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import autoImport from 'astro-auto-import';
import rehypeExternalLinks from 'rehype-external-links';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import icon from 'astro-icon'


import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  site: 'https://ilm.aalam.in/',
  // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  integrations: [
    autoImport({
    imports: [
      // codeSnippetAutoImport,
      './src/components/mdx/CommitCard.astro',
      './src/components/mdx/ConsCard.astro',
      './src/components/mdx/Link.astro',
      './src/components/mdx/FileTree/FileTree.astro',
      './src/components/mdx/SeriesCard/SeriesCard.astro',
      './src/components/mdx/Step.astro',
      './src/components/mdx/ProsCard.astro',
      './src/components/mdx/ImageBrowser.astro',
      './src/components/mdx/Alert.astro',
      './src/components/mdx/InfoAlert.astro',
      './src/components/mdx/BadgeBox.astro',
    ],
  }), 
  // astroCodeSnippets(),
  mdx(), sitemap(), react(), svelte(), icon()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '$': path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      allowNodeBuiltins: true
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'css-variables'
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: {
            type: 'text',
            value: ' 🔗'
          }
        }
      ]
    ]
  },
  output: "static",
  adapter: vercel()
});
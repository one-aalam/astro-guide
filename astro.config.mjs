import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
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
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginColorChips } from 'expressive-code-color-chips';

// https://astro.build/config
export default defineConfig({
  site: 'https://ilm.aalam.in/',
  // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  integrations: [autoImport({
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
expressiveCode({
  themes: ['rose-pine-dawn', 'rose-pine-moon'],
  useDarkModeMediaQuery: true,
  themeCssRoot: ':root',
  themeCssSelector: (theme) => {
    let themeSelector;

    switch (theme.type) {
      case 'light':
        themeSelector = '[class=""]';
        break;
      case 'dark':
        themeSelector = '[class="dark"]';
        break;
      default:
        themeSelector = '[class=""]';
        break;
    }

    return themeSelector;
  },
  styleOverrides: {
    codeFontSize: 'var(--expressive-code-font-size)',
    codeLineHeight: '1.4',
    frames: {
      frameBoxShadowCssValue: 'none',
    },
    uiFontSize: "0.9rem",
  },
  defaultProps: {
    frame: 'code',
    showLineNumbers: true,
    overridesByLang: {
      'bash,shell,md,markdown': {
        showLineNumbers: false,
      },
    },
  },
  plugins: [
    // pluginLineNumbers(),
    pluginCollapsibleSections(),
    pluginColorChips()
  ],
}), mdx(), sitemap(), react(), svelte(), icon()],
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
    // shikiConfig: {
    //   theme: 'css-variables'
    // },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow noopener noreferrer"], 
          target: "_blank",
          content: {
            type: 'text',
            value: ' 🔗',
          }
        }
      ]
    ]
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  output: "static",
  adapter: vercel()
});
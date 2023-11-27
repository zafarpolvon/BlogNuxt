import { resolve } from "pathe";
export default defineNuxtConfig({
  hooks: {
    'pages:extend': async (pages) => {
        pages.push({
            name: 'index',
            path: '/',
            file: resolve(__dirname, './pages/Index.vue'),
          }
        );
        pages.push({
          name: 'post',
          path: '/post/:id',
          file: resolve(__dirname, './pages/post/Index.vue'),
        });
       
    }
  },
 


  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api'
    }
  },
  app: {
    baseURL: '/nuxt-github-pages/', 
    buildAssetsDir: 'assets', 
  },
  build: {
    viteOptions: {
      build: {
        rollupOptions: {
          external: ['/home/runner/work/BlogNuxt/BlogNuxt/pages/comments/Index.vue?macro=true']
        }
      }
    }
  }
 
})

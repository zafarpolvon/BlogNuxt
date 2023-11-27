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
        pages.push({
          name: 'comments',
          path: '/comments',
          file: resolve(__dirname, './pages/comments/Index.vue'),
        });
    }
  },
 


  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api'
    }
  },
  
  
 
})

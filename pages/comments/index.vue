<template>
    <div>
        <div class="container">
          <div>
            <n-input v-model:value="state.search" @update:value="handleSearch" type="text" placeholder="Search by email" />
          </div>
          <div>
            <ul class="comments_ul">
              <li v-for="(com, index) in state.commentss" :key="index" class="comments_item">
                <NuxtLink :to="{ name: 'post', params: { id: com?.postId } }" class="comments_link">
                  <div class="comments_box">
                    <div class="comments_info">
                      <div class="user_info">
                        <div class="avatar_svg">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><defs></defs><path d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24zM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8zM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0z" fill="#a0a09f"></path></svg>
                        </div>
                        <div class="comments_date">
                          <span>ID: {{ com?.id }}</span>
                          <span>UserEmail: {{ com?.email }}</span>
                        </div>
                      </div>
                      <div class="comments_title">
                        <h4>postId: {{ com.postId }}</h4>
                        <h5>{{ com?.name }}</h5>
                        <p>{{ com?.body }}...</p>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </li>
          </ul>
          </div>
        </div>
      <div ref="observerElement" style="height: 1px"></div>
      <div class="loader_center" v-if="loading">
        <Loader />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, toRefs } from "vue";
  import { NInput } from "naive-ui";
  import { fetchComments } from "../store/index";
  
  const state = reactive({
    commentss: [],
    search: ''
  });
  
  const page = ref(1);
  const observerElement = ref(null)
  const pageSize = 10;
  let loading = ref(false);
  
  const fetchData = async () => {
    if (loading.value) return;
  
    loading.value = true;
  
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const start = (page.value - 1) * pageSize;
      const end = page.value * pageSize;
  
      const newComments = await fetchComments({ _start: start, _end: end });
      state.commentss = [...state.commentss, ...newComments];
      page.value++;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loading.value = false;
    }
  };
  const handleSearch = async (newValue) => {
    try {
      const params = {
        email_like: newValue
      };
      if(newValue.length < 1) {
        page.value = 1
        state.commentss = []
        fetchData()
        return
      }
      const newData = await fetchComments(params);
      console.log(newData);
      
      state.commentss = newData;
    } catch (error) {
      console.error('Error', error);
    }
  };
  
  
  onMounted(() => {
    fetchData();
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if(!state.search.length) {
            fetchData();
          }
        }
      },
      { threshold: 0.5 }
    );
  
    if (observerElement.value) {
      observer.observe(observerElement.value);
    }
    onUnmounted(() => {
      observer.disconnect();
    });
  });
  </script>
  
  <style scoped>
  .comments_item {
    border: 1px solid #d9d9d9;
  }
  .loader_center {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .container {
    max-width: 1100px; 
    margin: 0 auto; 
    padding: 20px; 
  }
  .comments_ul {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  .comments_item {
    display: flex;
    width: 100%;
    margin: 10px 0;
  }
  .comments_box {
    display: flex;
    width: 100%;
    height: 285px;
  }
  .comments_image {
    width: 50%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1699760813893-fe5b1e5695a9?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover; 
    box-sizing: border-box;
    background-repeat: no-repeat;
  }
  .comments_info {
    width: 50%;
    padding: 20px 25px;
    box-sizing: border-box;
  }
  .avatar_svg {
    width: 40px;
  }
  .user_info {
    display: flex;
    flex-direction: row;
  }
  .comments_date {
    display: flex;
    flex-direction: column;
  }
  .comments_date span {
    font-size: 12px;
    color: #585656;
    margin-left: 5px;
  }
  .comments_title h5 {
    font-size: 20px;
    font-weight: 400;
    color: #585656;
    text-transform: uppercase;
    margin: 10px 0 0 0;
  }
  .comments_title h4 {
    font-size: 15px;
    margin-top: 15px;
    color: #585656;
    text-transform: capitalize;
    margin: 10px 0 0 0;
  }
  .comments_title p {
    margin-top: 15px;
    color: #585656;
    text-transform: capitalize;
  }
  .comments_link {
    text-decoration: none;
    width: 100%;
  }
  .comments_link:hover h5 {
    color: #18a058;
  }
  </style>
  
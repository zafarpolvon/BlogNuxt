<template>
  <div>
      <div class="container">
        <div class="filter_posts">
          <div class="filter_input">
            <n-input v-model:value="state.search" @update:value="handleSearch" type="text" placeholder="Search by name" />
          </div>
          <div class="filter_button">
            <n-button @click="sortPostsByTitle">
              <template #icon>
                <svg v-if="sortToggle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm240-64H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z" fill="currentColor"></path></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm112-128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 65.63V48a16 16 0 0 0-16-16H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 190.37V208a16 16 0 0 0 16 16zm159.06 234.62l-59.27-160A16 16 0 0 0 372.72 288h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 480h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 480H432a16 16 0 0 0 15.06-21.38zM335.61 400L352 352l16.39 48z" fill="currentColor"></path></svg>
              </template>
            </n-button>
          </div>
        </div>
        <div>
          <ul class="post_ul">
            <li v-for="(post, index) in state.posts" :key="index" class="post_item">
              <NuxtLink :to="{ name: 'post', params: { id: post?.id } }" class="post_link">
                <div class="post_box">
                  <div class="post_image"></div>
                    <div class="post_info">
                      <div class="user_info">
                        <div class="avatar_svg">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><defs></defs><path d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24zM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8zM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0z" fill="#a0a09f"></path></svg>
                        </div>
                        <div class="post_date">
                          <span>ID: {{ post?.id }}</span>
                          <span>UserId: {{ post?.userId }}</span>
                        </div>
                      </div>
                      <div class="post_title">
                        <h5>{{ post?.title }}</h5>
                        <p>{{ post?.body }}...</p>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </li>
          </ul>
        </div>
        <div class="loader_center" v-if="loading">
          <Loader />
        </div>
        <client-only>
          <n-pagination v-if="!loading && !state.search.length" v-model:page="page" :page-count="100" @update:page="handlePageChange" />
        </client-only>
      </div>
     
   
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NInput, NPagination, NButton } from "naive-ui";
import { fetchPosts } from "../store/index";


const state = reactive({
  posts: [],
  search: '',
  sortOrder: 'asc'
});

const page = ref(1);
const sortToggle = ref(false)
let loading = ref(false);

const fetchData = async () => {
  if (loading.value) return;

  loading.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newPosts = await fetchPosts({ _page: page.value});
    state.posts = newPosts;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};
const handleSearch = async (newValue) => {
  try {
    const params = {
      title_like: newValue
    };
    if(newValue.length < 1) {
      page.value = 1
      state.posts = []
      fetchData()
      return
    }
    const newData = await fetchPosts(params);
    console.log(newData);
    
    state.posts = newData;
  } catch (error) {
    console.error('Error', error);
  }
};
const handlePageChange = () => {
  state.posts = []
  fetchData();
};
const sortPostsByTitle = () => {
  sortToggle.value =! sortToggle.value
  console.log(sortToggle.value);
  
  state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
  state.posts.sort((a, b) => {
    const order = state.sortOrder === 'asc' ? 1 : -1;
    return order * a.title.localeCompare(b.title);
  });
};


onMounted(() => {
  fetchData();
});
</script>

<style>
.post_item {
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
.post_ul {
  display: flex;
  flex-direction: column;
  padding: 0;
}
.post_item {
  display: flex;
  width: 100%;
  margin: 10px 0;
}
.post_box {
  display: flex;
  width: 100%;
  height: 350px;
}
.post_image {
  width: 50%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1699760813893-fe5b1e5695a9?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover; 
  box-sizing: border-box;
  background-repeat: no-repeat;
}
.post_info {
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
.post_date {
  display: flex;
  flex-direction: column;
}
.post_date span {
  font-size: 12px;
  color: #585656;
  margin-left: 5px;
}
.post_title h5 {
  font-size: 20px;
  font-weight: 400;
  color: #585656;
  text-transform: uppercase;
  margin: 10px 0 0 0;
}
.post_title p {
  margin-top: 15px;
  color: #585656;
  text-transform: capitalize;
}
.post_link {
  text-decoration: none;
  width: 100%;
}
.post_link:hover h5 {
  color: #18a058;
}
.filter_posts {
  display: flex;
  flex-direction: row;
}
.filter_input {
  width: 100%;
}
.filter_button {
  margin-left: 20px;
}
</style>

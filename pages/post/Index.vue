<template>
  <div class="container">
    <div class="loader_center" v-if="loading">
      <Loader />
    </div>
    <div v-else >
      <div class="postId_box">
        <div class="post_author">
          <div class="avatar_svg">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><defs></defs><path d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24zM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8zM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0z" fill="#a0a09f"></path></svg>
          </div>
          <div class="post_authour_info">
            <span class="date_post">26 Nov</span>
            <span class="date_post">{{ postData?.email }}</span>
          </div>
        </div>
        <div class="post_title">
          <h5>{{ postData?.name }}</h5>
          <p>{{ postData?.body }}...</p>
        </div>
        <div v-if="!loading" class="post_image_box">
          <div class="post_image"></div>
        </div>
      </div>
      <div class="comments_box">
        <div v-for="(com, index) in comments" class="comments_item" :key="index">
          <div class="comment_body">
            <div class="comments_author">
              <div class="avatar_svg">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><defs></defs><path d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24zM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8zM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0z" fill="#a0a09f"></path></svg>
              </div>
              <div class="comments_authour_info">
                <span class="date_post">ID:{{ com?.id }}</span>
                <span class="date_post">{{ com?.email }}</span>
              </div>
            </div>
            <div>
              <div class="comments_title">
                <span>POSTID: {{ com.postId }}</span>
                <h5>{{ com?.name }}</h5>
                <p>{{ com?.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue";
import { useRoute } from "vue-router";
import { fetchPostId, fetchCommentsByPost } from "../../store/index";

let loading = ref(false);
const route = useRoute();
const { postData, comments } = toRefs({
  postData: ref({}),
  comments: ref({})
});

onMounted(() => {
  fetchData();
})

const fetchData = async () => {
  if (loading.value) return;
  
  loading.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const postId = route.params.id;
    const newData = await fetchPostId(postId);
    const commentsData = await fetchCommentsByPost(postId)
    postData.value = newData;
    comments.value = commentsData
    console.log(comments.value);
    

  } catch (error) {
    console.error("Error", error);
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped>
.postId_box {
  border: 1px solid #d9d9d9;
  padding: 50px;
}
.comments_box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.comments_item {
  display: flex;
  margin-top: 20px;
  border: 1px solid #d9d9d9;
  padding: 50px;
}

.container {
  max-width: 1100px; 
  margin: 0 auto; 
  padding: 20px; 
}
.post_author {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.comments_author {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar_svg {
  width: 40px;
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
.comments_title {
  margin-top: 20px;
}
.comments_title h5 {
  font-size: 20px;
  font-weight: 400;
  color: #585656;
  text-transform: uppercase;
  margin: 10px 0 0 0;
}
.comments_title p {
  margin-top: 15px;
  color: #585656;
  text-transform: capitalize;
}
.post_image_box {
  width: 100%;
  height: 500px;
}
.post_image {
  flex: 1;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1699760813893-fe5b1e5695a9?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: 100%; 
  box-sizing: border-box;
}
.date_post {
  margin-left: 5px;
}
.comment_body {
  display: flex;
  flex-direction: column;
}
</style>
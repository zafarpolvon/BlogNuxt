<template>
  <div>
    <div class="header_box">
      <div class="header_search">
       AX
      </div>
  
      <div class="header_column">
        <ul class="header_navbar">
          <li>
            <NuxtLink to="/" class="comments_link">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/comments" class="comments_link">
              Comments
            </NuxtLink>
          </li>
        </ul>
      </div>
        
    </div>
    <div class="header_decoration">
      <NuxtLink to="/" class="comments_link">
        <span><b>Design</b> For <b>Blog</b></span>
      </NuxtLink>
    </div>
  </div>
</template>
  
<script setup lang="ts">

</script>
  
  <style scoped>
    .header_box {
      padding: 0 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .header_column {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
    .header_navbar {
      display: flex;
      flex-direction: row;
    }
    .header_navbar li {
      display: flex;
      font-size: 12px;
      
      padding: 0 10px;
    }
    .header_navbar li a {
      display: flex;
      font-size: 12px;
      text-transform: uppercase;
      color: #585656;
      padding: 0 10px;
      text-decoration: none;
    }
    .ngrid_item {
      display: flex;
      align-items: center;
    }
    .header_search {
      display: flex;
      align-items: center;
      width: 500px;
    }
    .header_decoration {
      background-color: #f1f1f1;
      padding: 10px 0;
      text-align: center;
      font-size: 22px;
    }
    .header_decoration a {
      color: #585656;
      text-transform: uppercase;
      text-decoration: none;

    }
  </style>
  
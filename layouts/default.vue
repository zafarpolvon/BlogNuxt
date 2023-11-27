
<template>
  <div>
    <client-only fallback-tag="span" fallback="Loading...">
      <Header />
    </client-only>
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import Header from '../components/Header.vue'

</script>
<style >
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

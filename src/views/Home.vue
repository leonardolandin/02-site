<template>
<div class="container-header">
  <Header></Header>
</div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: { Header }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-header {
  height: 110px;
}
</style>

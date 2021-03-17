<template>
  <div class="home">
    <div>
      <Header></Header>
    </div>
    <div>
      <ListView></ListView>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListView from '@/components/ListView.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  
  components: {
    ListView,
    Header
  }
}
</script>

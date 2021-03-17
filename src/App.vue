<template>
  <div>
    <div>
      <van-dialog :show="show" confirm-button-text="確認" confirm-button-color="#1d1e22" @confirm="check">
        <template #title>
          <div style="font-size:18px;font-family: serif;color:#1d1e22;">
            Enter username
          </div>
        </template>
        <template #default>
          <van-field v-model="inputVal" label="Username"  />
        </template>
      </van-dialog>
    </div>
    <div class="header">
      <van-sticky>
        <Header></Header>
      </van-sticky>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRouter } from "vue-router";
import cookie from './cookie.js';
import Header from '@/components/Header.vue'
// import { useStore } from 'vuex';

export default {
  components: {
    Header
  },

  setup() {
    // const store = useStore();
    const { getCookie,setCookie } = cookie();

    const router = useRouter();
    const inputVal = ref('');
    const user = ref('default');

    const show = computed(()=>{
      if(user.value === ''){
        router.push({ name: 'ListView'});
        return true;
      } else return false;
    })

    onMounted(()=>{
      user.value = getCookie('user') ? getCookie('user') : '';
    })

    function check() {
      const bool =  inputVal.value === '' ? false : true;
      if(bool){
        setCookie('user',inputVal.value);
        user.value = inputVal.value;
      }
    }

    return {
      show,
      inputVal,
      check
    }
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

::v-deep(.van-dialog__confirm){
  background-color: #969799;
}
</style>

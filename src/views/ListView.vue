<template>
    <div>
        <div>
            <div class="header">
                <van-sticky>
                    <van-nav-bar left-text="Chat">
                        <template #right>
                            <van-icon name="chat-o" size="3rem" />
                        </template>
                    </van-nav-bar>
                </van-sticky>
            </div>
        </div>
        <div class="searchBar">

        </div>
        <div>
            <RoomList @clickRoom="toRoom"></RoomList>
        </div>
    </div>  
</template>

<script>
// import { onActivated } from '@vue/runtime-core';
import RoomList from '@/components/RoomList.vue'
import { useRouter } from "vue-router";

export default {
    name: 'ListView',

    components: {
        RoomList,
    },

    setup() {    
        const router = useRouter()

        function toRoom(id){
            router.push({ name: 'ChatRoom', params: { id: id } });
        }

        return {
            toRoom,
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ::v-deep(.van-nav-bar__text){
        font-size: 25px;
        font-family: 'Comic Sans MS';
    }
</style>

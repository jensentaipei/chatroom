<template>
    <div>
        <div class="searchBar">

        </div>
        <div>
            <RoomList @clickRoom="toRoom"></RoomList>
        </div>
    </div>  
</template>

<script>
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

</style>

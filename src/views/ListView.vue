<template>
    <div>

        <div class="header">
            <van-sticky>
                <van-nav-bar left-text="Chat">
                    <template #right>
                        <van-icon name="chat-o" size="3rem" @click="show=true" />
                    </template>
                </van-nav-bar>
            </van-sticky>
        </div>
        
        <div class="searchBar">

        </div>

        <div
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(105, 105, 105, 0.8)"
            style="background-color:#969799;">
            <RoomList @clickRoom="toRoom" @loadingFinish="toFinish"></RoomList>
        </div>

        <div>
            <van-dialog :show="show" confirm-button-text="確認" confirm-button-color="#1d1e22" @confirm="addRoom" @cancel="cancelRoom" show-cancel-button>
                <template #title>
                    <div style="font-size:18px;font-family: serif;color:#1d1e22;">
                        Enter room name
                    </div>
                </template>
                <template #default>
                    <van-field v-model="inputVal" label="RoomName"  />
                </template>
            </van-dialog>
        </div>
    </div>  
</template>

<script>
import { ref  } from '@vue/runtime-core';
import RoomList from '@/components/RoomList.vue'
import { useRouter } from "vue-router";
import { db } from '../db';


export default {
    name: 'ListView',

    components: {
        RoomList,
    },

    setup() {    
        const router = useRouter();
        const firestore = db.firestore();

        const loading = ref(true);
        const show = ref(false);
        const inputVal = ref('');

        function toRoom(id){
            router.push({ name: 'ChatRoom', params: { id: id } });
        }

        function toFinish(){
            loading.value = false;
        }
        
        function addRoom(){
            if(!inputVal.value){
                return;
            }

            const ref = firestore.collection('ChatRoom').doc(); // add() 是針對集合使用
            const now = new Date();

            ref.set({
                lastMsg: '',
                lastMsgTime: now,
                roomName: inputVal.value
            }).then(() => {
                console.log('send msg success');
                show.value = false;
                inputVal.value = '';
            });
        }

        function cancelRoom(){
            show.value = false;
            inputVal.value = '';
        }

        return {
            toRoom,
            toFinish,
            loading,
            addRoom,
            show,
            cancelRoom,
            inputVal
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
    ::v-deep(.el-icon-loading){
        color: white;
    }
    ::v-deep(.van-dialog__confirm){
       background-color: #969799;
    }
    ::v-deep(.van-dialog__cancel){
       background-color: #969799;
    }
</style>

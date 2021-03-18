<template>
    <div class="list">
        <van-cell v-for="item in roomList.value" :key="item.id" @click="clickRoom(item.id)">
            <template #title>
                <div style="text-align:left;font-size:18px;font-family: serif;color:white;">
                    {{item.roomName}}
                </div>
            </template>
            <template #label>
                <div style="text-align:left;font-size:14px;padding-left:10px;color:#c8c9cc">
                    <span v-if="item.lastMsg">
                        {{item.lastMsg}}
                    </span>
                    <span v-else>
                        &nbsp;
                    </span>
                </div>
            </template>
            <template #extra>
                <div style="text-align:right;font-size:10px;color:#c8c9cc">
                    {{timestamp2Date(item.lastMsgTime.seconds)}}
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core'
import { db } from '../db'
import timeFormat from '../timeFormat.js';

export default {
    name: 'RoomList',

    setup(_, { emit }) {
        const { timestamp2Date } = timeFormat();

        const roomList = reactive([]);
        const firestore = db.firestore();

        let unsubscribe;

        onMounted(()=>{
            listenList().then(()=>{
               emit("loadingFinish");
            });
        })

        // onUnmounted(()=>{
        //     if(unsubscribe){
        //         unsubscribe();
        //     }
        // })

        function listenList() {
            return new Promise(function(resolve){
                if(unsubscribe){
                    unsubscribe();
                }
    
                unsubscribe = firestore.collection('ChatRoom').orderBy('lastMsgTime', 'desc').onSnapshot(querySnapshot => {
                    let tmp = [];
                    querySnapshot.forEach(doc => {
                        let docData = doc.data();
                        let docInfo = {
                            id: doc.id,
                            lastMsg:docData.lastMsg,
                            lastMsgTime:docData.lastMsgTime,
                            roomName:docData.roomName
                        };
                        tmp.push(docInfo);
                    });
                    roomList.value = tmp;
                    resolve();
                });
            })
        }

        function clickRoom(id){
            emit("clickRoom",id);
        }

        return {
            roomList,
            timestamp2Date,
            clickRoom
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

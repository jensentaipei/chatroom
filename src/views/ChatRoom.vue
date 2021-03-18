<template>
    <div>
        <div id="header">
            <van-nav-bar left-arrow @click-left="onClickLeft">
                <template #title>
                    <span style="font-size:28px;font-family:Comic Sans MS;color:white">{{roomName}}</span>
                </template>
                <!-- <template #right>
                    <van-icon name="chat-o" size="3rem" />
                </template> -->
            </van-nav-bar>
        </div>

        <div id="chat"
            v-loading="onloading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <div v-for="msg in message.value" :key="msg.id">
                <div v-if="msg.user != user">
                    <div class="messageBox">
                        <img src="../assets/image/user.png" class="messageBox__user">
                        <div class="messageBox__content">
                            <div class="messageBox__name">{{msg.user}}</div>
                            <div class="messageBox__message">
                            <div class="messageBox__text">{{msg.msg}}</div>
                            <!-- <div class="messageBox__readMore" @click="readMore($event)">顯示更多</div> -->
                            </div>
                            <!-- <div v-if="item.type == 'image'" class="messageBox__image"><img :src="item.message"></div> -->
                        </div>
                        <div class="messageBox__time">{{timestamp2Date(msg.insdt.seconds)}}</div>
                    </div>
                </div>
                <div v-else>
                    <div class="messageBox messageBox--self">
                        <div class="messageBox__time">{{timestamp2Date(msg.insdt.seconds)}}</div>
                        <div class="messageBox__content">
                            <!-- <div v-if="item.type == 'text'" class="messageBox__message"> -->
                                <div class="messageBox__text">{{msg.msg}}</div>
                            <!-- </div> -->
                            <!-- <div v-if="item.type == 'image'" class="messageBox__image"><img :src="item.message"></div> -->
                        </div>
                        <!-- <div v-if="hoverMessageId === item.id" class="messageBox__delete">
                            <span @click="deleteMessage(hoverMessageId)">刪除</span>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <div id="inputBottom">
            <van-field v-model="inputMsg" placeholder="輸入訊息內容" @keyup.enter="updateMsg" />
        </div>
        <span id="page-bottom"></span>
    </div>  
</template>

<script>
import { onMounted,onUnmounted,reactive,ref } from '@vue/runtime-core';
import { useRoute ,useRouter} from 'vue-router';
import { db } from '../db';
import timeFormat from '../timeFormat.js';
import cookie from '../cookie.js';

export default {
    name: 'ChatRoom',

    setup() {
        const { getCookie } = cookie();
        const { timestamp2Date } = timeFormat();
        const route = useRoute();
        const router = useRouter()
        const firestore = db.firestore();
        
        const id = route.params.id
        let unsubscribe;
        
        const message = reactive([]);
        const user = ref('');
        const inputMsg = ref('');
        const roomName = ref('');
        const onloading = ref(true);


        onMounted(() => {
            const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
            const headerHeight = document.querySelector('#header').clientHeight;
            const inputBottomHeight = document.querySelector('#inputBottom').clientHeight;
            const chat = document.querySelector('#chat').style;
            chat.minHeight = `${height - (headerHeight + inputBottomHeight)}px`;
            chat.paddingTop = `${headerHeight}px`;
            chat.paddingBottom = `${inputBottomHeight}px`;

            listenList(id).then(()=>{
                // let pageBottom = document.querySelector('#page-bottom');
                // pageBottom.scrollIntoView();
                onloading.value = false;
                window.scrollTo( 0, height +  headerHeight + inputBottomHeight);
            });
            user.value = getCookie('user');
            getRoomInfo().then((r)=>{
                roomName.value = r;
            });
        });

        onUnmounted(()=>{
            if(unsubscribe){
                unsubscribe();
            }
        })

        function listenList(id) {
            return new Promise(function(resolve){
                if(unsubscribe){
                    unsubscribe();
                }
                unsubscribe = firestore.collection('ChatRoom').doc(id).collection('message').orderBy('insdt', 'asc').onSnapshot(querySnapshot => {
                    let tmp = [];
                    querySnapshot.forEach(doc => {
                        let docData = doc.data();
                        docData.id = doc.id;
                        tmp.push(docData);
                    });
                    message.value = tmp;
                    resolve();
                });
            })
        }

        function updateMsg (){
            const now = new Date();
            const ref = firestore.collection('ChatRoom').doc(id); // add() 是針對集合使用

            const tmpMsg = inputMsg.value;
            inputMsg.value = '';
            
            if(tmpMsg === ''){
                return;
            }

            ref.collection('message').add({
                insdt: now,
                msg: tmpMsg,
                user: user.value
            }).then(() => {
                console.log('send msg success');
            });

            ref.update({
                lastMsg:tmpMsg,
                lastMsgTime:now
            }).then(() => {
                console.log('update data successful');
            });
        }

        function getRoomInfo() {
            return new Promise (function(resolve) {
                const ref = firestore.collection('ChatRoom').doc(id);
                ref.get().then(doc => {
                    const tmpName = doc.data().roomName;
                    resolve(tmpName)
                });
            })
        }

        function onClickLeft() {
            router.go(-1);
        }

        return {
            message,
            timestamp2Date,
            user,
            inputMsg,
            updateMsg,
            roomName,
            onClickLeft,
            onloading
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pop {
        margin: 30px;
        width: 200px;
        height: 100px;
        padding: 10px;
        background: #e91e63;
        border-radius: 8px;
        position: relative;
    }
    .pop::after {
        content:"";
        width: 0;
        height: 0;
        border: 12px solid;
        border-color: transparent #e91e63 transparent transparent;
        position: absolute;
        top: 45px;
        left: -24px;
    }
    .pop p {
        color: #fff;
        padding: 10px 20px;
    }
    .messageBox {
        padding: 5px 10px;
        position: relative;
    }
    .messageBox__user {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        vertical-align: top;
        display: inline-block;
        cursor: pointer;
    }
    .messageBox__content {
        max-width: 70%;
        display: inline-block;
    }
    .messageBox__name {
        margin: 5px 0px 5px 5px;
        font-size: 13px;
        color: #ACB0B8;
        vertical-align: top;
        cursor: pointer;
    }
    .messageBox__message {
        margin: 5px 0px 5px 5px;
        font-size: 12px;
        color: #35393D;
        letter-spacing: 0.6px;
        background-color: #E3E8EB;
        border-radius: 12px;
        line-height: 1.5;
        text-align: left;
        word-break: break-all;
        /*：與html的<pre></pre>同效果，可以使textarea的換行元素正常顯示 */
        white-space: pre-line;
    }
    .messageBox__text {
        padding: 8px 10px 9px 11px;
        max-height: 300px;
        overflow: hidden;
    }
    .messageBox__readMore {
        border-top: 1px solid #D9DBDD;
        margin-top: 6px;
        padding: 6px 13px 10px 13px;
        left: 0;
        right: 0;
        cursor: pointer;
        display: none;
    }
    .messageBox__image {
        margin: 5px 25px 5px 5px;
    }
    .messageBox__image img {
        border-radius: 5px;
        max-width: 100%;
        max-height: 335px;
    }
    .messageBox__time {
        transform: scale(0.7);
        color: #727C8A;
        vertical-align: bottom;
        margin: 0px 0px 5px -12px;
        display: inline-block;
    }
    .messageBox__delete {
        font-size: 12px;
        color: #ACB0B8;
        margin-right: 25px;
        cursor: pointer;
    }
    .messageBox__progress {
        width: 25%;
        margin-right: 60px;
        border-radius: 5px;
        background-color: #D4D9E1;
        height: 6px;
    }
    .messageBox__progress--state {
        background-color: #00CE00;
        height: 6px;
        width: 10%;
        border-radius: 5px;
        float: right;
    }
    .messageBox__progress--number {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        color: #B7B7B7;
        margin-right: 35px;
    }
    .messageBox--self {
        text-align: right;
    }
    .messageBox--self .messageBox__message {
        background-color: #AFF47E;
        margin-right: 25px;
    }
    .messageBox--self .messageBox__message__text {
        padding: 8px 10px 9px 11px;
        max-height: 100%;
        overflow: unset;
    }
    .messageBox--self .messageBox__time {
        margin: 0px -16px 5px 0px;
    }
    #header{
        position: fixed;
        width: 100%;
        z-index: 100;
    }
    #chat{
        background-color: 	#535353;
        /* z-index: 99; */
    }
    #inputBottom {
        position: fixed;
        width: 100%;
        z-index: 100;
        bottom:0;
    }
    ::v-deep(.van-nav-bar__text){
        font-size: 25px;
        font-family: 'Comic Sans MS';
    }
    ::v-deep(.el-icon-loading){
        color: white;
    }
</style>

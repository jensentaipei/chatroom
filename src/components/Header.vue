<template>
    <div class="header">
        <van-sticky>
            <van-nav-bar left-text="Chat">
                <template #right>
                    <van-icon name="chat-o" size="3rem" />
                </template>
            </van-nav-bar>
        </van-sticky>
    </div>  
</template>

<script>

export default {
    name: 'Header',
}
</script>

<style scoped>
    ::v-deep(.van-nav-bar__text){
        font-size: 25px;
        font-family: 'Comic Sans MS';
    }
    .header {
        position:-webkit-sticky; position:sticky; top:0;
    }
</style>

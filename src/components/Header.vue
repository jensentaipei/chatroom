<template>
    <div>
        <van-nav-bar left-text="Chat">
            <template #right>
                <van-icon name="chat-o" size="3rem" />
            </template>
        </van-nav-bar>
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
</style>

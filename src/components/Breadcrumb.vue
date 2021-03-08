<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{name1}}</el-breadcrumb-item>
            <transition appear enter-active-class="animated fadeInRight" mode="out-in">
                <el-breadcrumb-item :key="key">{{name2}}</el-breadcrumb-item>
            </transition>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    props: ['name1', 'name2'],
    computed: {
        key () {
            return this.$route.path

        }
    },
}
</script>
<style scoped>
.breadcrumb {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
}
</style>
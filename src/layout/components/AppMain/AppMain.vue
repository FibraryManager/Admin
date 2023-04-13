<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-show="$route.path !='/home'">
            <span class="line"></span>
            <el-breadcrumb-item v-show="$route.path=='/borrow'">借阅管理</el-breadcrumb-item>
            <el-breadcrumb-item v-show="$route.path=='/book'">图书管理</el-breadcrumb-item>
            <el-breadcrumb-item v-show="$route.path=='/user'">用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "AppMain"
}
</script>

<style scoped>
    .el-breadcrumb{
        height: 10px;
        padding: 15px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        margin-bottom: 10px;
        border-radius: 5px;
    }
    .line{
        position: absolute;
        color: #fff;
        border-left: 3px solid #ccc;
        left:27px;
        height: 15px;
    }
</style>
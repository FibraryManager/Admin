<template>
    <div class="navbar">
        <el-menu default-active="1" :router="true" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" acive-text-color="#ffd04b">
            <el-menu-item index="/home">
                <i class="el-icon-menu"></i><span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/borrow">
                <i class="el-icon-location"></i><span slot="title">借阅管理</span>
            </el-menu-item>
            <el-menu-item index="/book">
                <i class="el-icon-s-platform"></i><span slot="title">图书管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
                <i class="el-icon-s-check"></i><span slot="title">用户管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "AppNavbar"
}
</script>

<style scoped>
    .el-menu{
        border-right: none;
    }
</style>
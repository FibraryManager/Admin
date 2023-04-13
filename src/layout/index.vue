<template>
    <div>
        <div class="header">
            <AppHeader></AppHeader>
        </div>
        <div class="navbar">
            <AppNavbar></AppNavbar>
        </div>
        <div class="main">
            <AppMain></AppMain>
        </div>
    </div>
</template>

<script>
import AppHeader from "@/layout/components/AppHeader/AppHeader.vue";
import AppMain from "@/layout/components/AppMain/AppMain.vue";
import AppNavbar from "@/layout/components/AppNavbar/AppNavbar.vue";

export default {
    name: "AppLayout",
    components:{
        AppHeader,
        AppMain,
        AppNavbar
    }
};

</script>

<style scoped>
    .header {
        position: absolute;
        line-height: 50px;
        background-color: #130505;
        left: 0;
        right: 0;
        top: 0;
        color: #fff;
    }
    .navbar {
        position: absolute;
        width: 200px;
        background-color: #545c64;
        left: 0;
        right: 0;
        top: 50px;
        bottom: 0;
        color: #fff;
    }
    .main {
        position: absolute;
        background-color: #1e2020;
        left: 200px;
        right: 0;
        top: 50px;
        bottom: 0;
        padding: 20px;
        overflow-y: auto;
        color: #fff;
    }
</style>
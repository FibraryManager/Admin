<template>
    <div class="header">
        <a href="/" style="padding-left: 30px">
            <img src="@/assets/logo.png" class="logo" />
            <span class="title">后台管理系统</span>
        </a>
        <el-dropdown trigger="click" @command="quitOut">
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-user" command="a">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "AppHeader",
    data(){
        return{
            userData:[
                {
                    name: 'yunduo',
                }
            ]
        }
    },
    methods :{
        quitOut(command) {
            console.log("被点击" + command)
            localStorage.removeItem('accessToken')
            this.$router.push('/')
        }
    },
    created(){
        this.userData = JSON.parse(localStorage.getItem('manager-user'))
    },
}
</script>

<style scoped>
    .logo {
        border-radius: 5px;
        vertical-align: middle;
        width: 25px;
    }
    .title {
        position: absolute;
        color: #fff;
        padding-left: 5px;
        font-size: 18px;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-icon-arrow-down{
        font-size: 12px;
    }
    .el-dropdown{
        float:right;
        margin-right: 30px;
    }

</style>
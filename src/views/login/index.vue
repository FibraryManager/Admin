<template>
    <div class="login-box">
        <el-form :rules="rules" :model="form" ref="form" label-width="70px" class="login-form">
            <h2 class="login-title">图书管理系统后台</h2>
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
                <el-input placeholder="请输入手机号" v-model="form.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    placeholder="请输入密码"
                    v-model="form.password"
                    type="password"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    data() {
        return {
            form: {
                username: "",
                password:'',
                phoneNumber: ''
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
                phoneNumber: [
                    {  required: true, min: 11, max: 11, message: "输入正确的手机号", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        onSubmitLogin() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    axios
                        .post("/api/auth/admin/signin",{
                            nickname: this.form.username,
                            password: this.form.password,
                            phoneNumber: this.form.phoneNumber
                        })
                        .then(response => {
                            console.log(response)
                            localStorage.setItem('accessToken', 'Bearer ' + response.data)
                            this.$router.push('/')
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        .finally(() => {

                        })
                } else {
                    alert("条件不满足");
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
.login-form{
    width: 350px;
    background-color: #fff;
    padding: 15px;
    height: 300px;
    border-radius: 20px;
    position: absolute;
    margin-top: -125px;
    margin-left: -175px;
    top:50%;
    left:50%;
}
.login-box{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ccc;
}
.login-title{
    color: #333;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
}
</style>
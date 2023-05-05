<template>
    <div class="userInfo" style="width:100%;" max-height="380">
        <el-input
            v-model="searchValue" size="mini" clearable
            placeholder="请输入姓名或手机号" style="width:300px; margin-bottom: 20px; margin-top: 20px; margin-right: 5px"></el-input>
        <el-button type="primary" size="mini" @click="doFilter">搜索</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = true">添加用户</el-button>
        <el-table :data="tableData">
            <el-table-column fixed label="id" sortable :sort-by="['userId']" prop="userId"></el-table-column>
            <el-table-column label="用户名" prop="nickname"></el-table-column>
            <el-table-column label="手机号" prop="phoneNumber"></el-table-column>
            <el-table-column label="用户类型" sortable :sort-by="['type']" prop="type" :formatter="formatterType"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row.userId, scope.row.nickname, scope.row.type)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.userId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems"
            style="margin-top: 10px"
        ></el-pagination>

        <el-dialog title="添加用户" :visible.sync="dialogVisible">
            <el-form :model="user">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="user.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="formLabelWidth">
                    <el-input v-model="user.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号" :label-width="formLabelWidth">
                    <el-input v-model="user.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser(user)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="更改用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="userDTO">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="userDTO.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" :label-width="formLabelWidth">
                    <el-select v-model="userDTO.type" placeholder="请选择用户类型">
                        <el-option label="借阅者" value="1"></el-option>
                        <el-option label="图书管理员" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleOK(userDTO)">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import axios from "axios";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "User",
    data(){
        return {
            userInfoList:[],
            user:{
                nickname: '',
                password: '',
                phoneNumber: ''
            },
            userDTO:{
                userId: '',
                nickname: '',
                type: '',
                role: ''
            },
            flag:false,
            tableData: [],
            dialogVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            searchValue: "",
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
        }
    },
    methods:{
        getData() {
            axios
                .get("/api/admin/user",{
                    Authorization: localStorage.getItem('accessToken')
                })
                .then(response => {
                    console.log(response)
                    this.userInfoList = response.data
                    this.totalItems = response.data.length
                    if (this.totalItems > this.pageSize) {
                        for (let index = 0; index < this.pageSize; index++) {
                            this.tableData.push(this.userInfoList[index]);
                        }
                    } else {
                        this.tableData = this.userInfoList;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('获取用户结束')
                })
        },
        formatterType (row) {
            if(row.type === '1'){
                return '借阅者'
            }else if (row.type === '2'){
                return '图书管理员'
            }else if(row.type === '3'){
                return '用户管理员'
            }
        },
        addUser(user) {
            if(user.password == ''){
                this.$message({
                    type: 'warning',
                    message: '用户密码不能为空'
                });
            }else if(user.phoneNumber.length != 11){
                this.$message({
                    type: 'warning',
                    message: '请输入正确的手机号'
                });
            }else{
                axios
                    .post("/api/auth/signup",{
                        nickname: user.nickname,
                        password: user.password,
                        phoneNumber: user.phoneNumber
                    })
                    .then(respnse => {
                        console.log(respnse)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        console.log("添加用户完成")
                        this.dialogVisible = false
                        this.getData()
                        this.user.nickname = ''
                        this.user.password = ''
                        this.user.phoneNumber = ''
                    })
            }
        },
        handleDelete(id)
        {
            console.log(id)
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    axios
                        .delete("/api/admin/user",{
                            params:{
                                id: id
                            },
                            Authorization: localStorage.getItem('accessToken')
                        })
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        .finally(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData()
                        })
                })
                .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleEdit(id, name, role) {
            this.dialogFormVisible = true
            this.userDTO.userId = id
            this.userDTO.nickname = name
            this.userDTO.type = role
        },
        handleOK() {
            axios
                .put("/api/admin/user",{
                    userId: this.userDTO.userId,
                    nickname: this.userDTO.nickname,
                    type: this.userDTO.type
                },{
                    Authorization: localStorage.getItem('accessToken')
                })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    this.dialogFormVisible = false
                    this.getData()
                })
        },
        doFilter() {
            this.filterTableData = [];
            this.userInfoList.filter((item)=>{
                if('nickname' in item || 'phoneNumber' in item){
                    // 按编号或地区查询 注意：根据实际数据 灵活调整字母大小写
                    if (item.nickname.toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1
                        || item.phoneNumber.indexOf(this.searchValue) > -1) {
                        this.filterTableData.push(item);
                    }
                }
            })
            // 页面数据改变重新统计数据数量和当前页
            this.currentPage = 1;
            this.totalItems = this.filterTableData.length;
            // 渲染表格,根据值
            this.currentChangePage(this.filterTableData);
            // 页面初始化数据需要判断是否检索过
            this.flag = true;
        },
        // 每页显示条数改变触发
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(1);
        },
        // 当前页改变触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            // 判断是否为搜索的数据,传入对应值
            if (!this.flag) {
                this.currentChangePage(this.userInfoList);
            } else {
                this.currentChangePage(this.filterTableData);
            }
        },
        // 根据分页，确定当前显示的数据
        currentChangePage(list) {
            let fromNum = (this.currentPage - 1) * this.pageSize;
            let toNum = this.currentPage * this.pageSize;
            this.tableData = [];
            for (; fromNum < toNum; fromNum++) {
                if (list[fromNum]) {
                    this.tableData.push(list[fromNum]);
                }
            }
        },
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>

</style>
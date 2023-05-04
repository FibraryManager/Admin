<meta name="referrer" content="no-referrer" />

<template>
    <div class="borrowinfo" style="width:100%;" max-height="380">
        <!--        <el-button type="primary" size="mini" @click="dialogVisible = true">添加用户</el-button>-->
        <!--        <br/>-->
        <el-input
            v-model="searchValue" size="mini" clearable
            placeholder="请输入书籍名称" style="width:300px; margin-bottom: 20px; margin-top: 20px; margin-right: 5px"></el-input>
        <el-button type="primary" size="mini" @click="doFilter">搜索</el-button>
        <el-table :data="tableData" border>
            <el-table-column
                fixed
                width="90px"
                label="图书号"
                sortable :sort-by="['id']"
                prop="id"></el-table-column>
            <el-table-column
                width="160px"
                label="图书编号"
                sortable :sort-by="['isbn']"
                prop="isbn"></el-table-column>
            <el-table-column
                width="140px"
                label="书籍名称"
                prop="bookName"></el-table-column>
            <el-table-column
                width="110px"
                label="借阅状态"
                prop="status "
                sortable :sort-by="['status'] "
                :formatter="formatterStatus"></el-table-column>
            <el-table-column
                width="110px"
                label="作者姓名"
                sortable :sort-by="['bookAuthor']"
                prop="bookAuthor"></el-table-column>
            <el-table-column
                width="160px"
                label="出版社"
                sortable :sort-by="['publisher']"
                prop="publisher"></el-table-column>
            <el-table-column
                width="120px"
                label="分类"
                sortable :sort-by="['classificationId']"
                prop="classificationId"
                :formatter="formatterClassify"></el-table-column>
            <el-table-column
                label="操作"
                fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleLook(scope.row.isbn, scope.row.imageUrl,scope.row.time)">查看</el-button>
                        <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">更新</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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

        <!--        <el-dialog title="添加用户" :visible.sync="dialogVisible">-->
        <!--            <el-form :model="borrow">-->
        <!--                <el-form-item label="用户名" :label-width="formLabelWidth">-->
        <!--                    <el-input v-model="user.nickname" autocomplete="off"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="用户密码" :label-width="formLabelWidth">-->
        <!--                    <el-input v-model="user.password" autocomplete="off"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="用户手机号" :label-width="formLabelWidth">-->
        <!--                    <el-input v-model="user.phoneNumber" autocomplete="off"></el-input>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--                <el-button type="primary" @click="addUser(user)">确 定</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->

        <el-dialog title="更新图书信息" :visible.sync="dialogUpdateVisible">
            <el-form :model="bookDTO">
                <el-form-item label="图书编号" :label-width="formLabelWidth">
                    <el-input v-model="bookDTO.isbn" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图书名" :label-width="formLabelWidth">
                    <el-input v-model="bookDTO.bookName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图书作者" :label-width="formLabelWidth">
                    <el-input v-model="bookDTO.bookAuthor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="bookDTO.pbTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择出版时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出版社" :label-width="formLabelWidth">
                    <el-input v-model="bookDTO.publisher" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图书状态" :label-width="formLabelWidth">
                    <el-select v-model="bookDTO.flag" placeholder="请选择图书状态">
                        <el-option label="借出" value="借出"></el-option>
                        <el-option label="在库" value="在库"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图书分类" :label-width="formLabelWidth">
                    <el-select v-model="bookDTO.classification" placeholder="请选择图书分类">
                        <el-option
                            v-for="item in this.classifyInfoList"
                            :key="item.classification"
                            :label="item.classification"
                            :value="item.classification"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上架时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="bookDTO.time"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择上架时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="图书图片" :label-width="formLabelWidth">
                    <el-image :src="bookDTO.imageUrl" type="p" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdateOK(bookDTO)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="图书详情信息" :visible.sync="dialogDetailVisible">
            <el-form :model="bookDTO">
                <el-form-item label="isbn" :label-width="formLabelWidth">
                    <el-input v-model="bookDTO.isbn" autocomplete="off" type="text"></el-input>
                </el-form-item>
                <el-form-item label="图书图片" :label-width="formLabelWidth">
                    <el-image :src="bookDTO.imageUrl" type="p" />
                </el-form-item>
                <el-form-item label="上架时间" :label-width="formLabelWidth">
                    <el-input v-model="bookDTO.time" autocomplete="off" type="text"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDetailVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import axios from "axios";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Book",
    data(){
        return {
            bookInfoList:[],
            classifyInfoList: [],
            book:{
                nickname: '',
                password: '',
                phoneNumber: ''
            },
            bookDTO:{
                id: '',
                bookAuthor: '',
                bookName: '',
                classificationId: '',
                isbn: '',
                imageUrl: '',
                pbTime: '',
                publisher: '',
                status: '',
                flag: '',
                time: '',
                classification: ''
            },
            imgUrl: '',
            tableData: [],
            dialogVisible: false,
            dialogDetailVisible: false,
            dialogUpdateVisible: false,
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
                .get("/api/books/allbooks",{
                    headers:{
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                .then(response => {
                    console.log(response)
                    this.bookInfoList = response.data
                    this.tableData = this.bookInfoList
                    this.totalItems = response.data.length
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('获取借阅结束')
                })
        },
        getClassify() {
            axios
                .get("/api/classify/allClassify",{
                    headers:{
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                .then(response => {
                    console.log(response)
                    this.classifyInfoList = response.data
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('获取分类结束')
                })
        },
        formatterStatus (row) {
            const status = row.status
            if(status === 0) {
                this.bookDTO.flag = '在库'
                return '在库'
            } else if (status === 1) {
                this.bookDTO.flag = '借出'
                return '借出'
            }
        },
        formatterTime (time) {
            const zoneDate = new Date(time).toJSON()
            const date = new Date(+new Date(zoneDate)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            return date
        },
        formatterTimeAdapt (time) {
            const zoneDate = new Date(time.replace('-','/'))
            const date = new Date(+new Date(zoneDate)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            return date
        },
        formatterClassify(row) {
            const classificationId = row.classificationId
            for (const item of this.classifyInfoList) {
                if (item.id == classificationId) {
                    return item.classification
                }
            }
        },
        formatterClassifyId(Classification) {
            const classification = Classification
            for (const item of this.classifyInfoList) {
                if (item.classification == classification) {
                    return item.id
                }
            }
        },
        // addUser(user) {
        //     if(user.password == ''){
        //         this.$message({
        //             type: 'warning',
        //             message: '用户密码不能为空'
        //         });
        //     }else if(user.phoneNumber.length != 11){
        //         this.$message({
        //             type: 'warning',
        //             message: '请输入正确的手机号'
        //         });
        //     }else{
        //         axios
        //             .post("/api/auth/signup",{
        //                 nickname: user.nickname,
        //                 password: user.password,
        //                 phoneNumber: user.phoneNumber
        //             })
        //             .then(respnse => {
        //                 console.log(respnse)
        //             })
        //             .catch(error => {
        //                 console.log(error)
        //             })
        //             .finally(() => {
        //                 console.log("添加用户完成")
        //                 this.dialogVisible = false
        //                 this.getData()
        //                 this.user.nickname = ''
        //                 this.user.password = ''
        //                 this.user.phoneNumber = ''
        //             })
        //     }
        // },
        handleDelete(id)
        {
            console.log(id)
            this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    axios
                        .delete("/api/books/deleteBook",{
                            params:{
                                id: id
                            },
                            headers: {
                                Authorization: localStorage.getItem('accessToken')
                            }
                        })
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        .finally(() => {
                            this.getData()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        handleLook(isbn, imageUrl, time) {
            this.dialogDetailVisible = true
            this.bookDTO.isbn = isbn
            this.bookDTO.imageUrl = require(`/static/${imageUrl}`)
            this.bookDTO.time = time
        },
        handleUpdate(row) {
            this.dialogUpdateVisible = true
            console.log(row)
            this.bookDTO.id = row.id
            this.bookDTO.isbn = row.isbn
            this.bookDTO.bookName = row.bookName
            this.bookDTO.bookAuthor = row.bookAuthor
            this.bookDTO.classificationId = row.classificationId
            this.bookDTO.imageUrl = require(`/static/${row.imageUrl}`)
            this.bookDTO.pbTime = this.formatterTime(row.pbTime)
            this.bookDTO.publisher = row.publisher
            this.bookDTO.status = row.status
            this.bookDTO.time = this.formatterTime(row.time)
            this.bookDTO.classification = this.formatterClassify(row)
            this.bookDTO.flag = this.formatterStatus(row)
            this.imgUrl = row.imageUrl
        },
        handleUpdateOK(bookDTO) {
            if(bookDTO.flag === '借出') this.bookDTO.status = 1
            else if(bookDTO.flag === '在库') this.bookDTO.status = 0
            this.bookDTO.classificationId = this.formatterClassifyId(this.bookDTO.classification)
            axios
                .put("/api/books/updateBook",{
                    id: this.bookDTO.id,
                    isbn: this.bookDTO.isbn,
                    bookName: this.bookDTO.bookName,
                    bookAuthor: this.bookDTO.bookAuthor,
                    classificationId: this.bookDTO.classificationId,
                    imageUrl: this.imgUrl,
                    pbTime: this.bookDTO.pbTime,
                    publisher: this.bookDTO.publisher,
                    status: this.bookDTO.status,
                    time: this.bookDTO.time
                },{
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    this.getData()
                    this.dialogUpdateVisible = false
                })
        },
        // handleOK() {
        //     axios
        //         .put("/api/admin/user",{
        //             userId: this.userDTO.userId,
        //             nickname: this.userDTO.nickname,
        //             type: this.userDTO.type
        //         },{
        //             Authorization: localStorage.getItem('accessToken')
        //         })
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //         .finally(() => {
        //             this.dialogFormVisible = false
        //         })
        // },
        doFilter() {
            this.filterTableData = [];
            this.bookInfoList.filter((item)=>{
                if('id' in item || 'bookName' in item || 'isbn' in item){
                    // 按编号或地区查询 注意：根据实际数据 灵活调整字母大小写
                    if (item.id.indexOf(this.searchValue) > -1
                        || item.bookName.indexOf(this.searchValue) > -1
                        || item.isbn.indexOf(this.searchValue) > -1) {
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
                this.currentChangePage(this.bookInfoList);
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
        this.getClassify()
    }
}
</script>

<style scoped>

</style>
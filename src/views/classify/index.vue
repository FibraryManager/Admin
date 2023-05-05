<template>
    <div class="classifyInfo" style="width:100%;" max-height="380">
        <el-input
            v-model="searchValue" size="mini" clearable
            placeholder="请输入分类名" style="width:300px; margin-bottom: 20px; margin-top: 20px; margin-right: 5px"></el-input>
        <el-button type="primary" size="mini" @click="doFilter">搜索</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = true">添加分类</el-button>
        <el-table :data="tableData" border>
            <el-table-column fixed label="id" sortable :sort-by="['id']" prop="id" width="150px"></el-table-column>
            <el-table-column label="分类名" prop="classification"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row.id, scope.row.classification)">编辑</el-button>
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

        <el-dialog title="添加分类" :visible.sync="dialogVisible">
            <el-form :model="classify">
                <el-form-item label="分类名" :label-width="formLabelWidth">
                    <el-input v-model="classify.classification" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addClassify(classify)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="更改用户分类" :visible.sync="dialogFormVisible">
            <el-form :model="classifyDTO">
                <el-form-item label="分类名" :label-width="formLabelWidth">
                    <el-input v-model="classifyDTO.classification" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleOK(classifyDTO)">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import axios from "axios";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "classify",
    data(){
        return {
            classifyInfoList:[],
            classify:{
                classification: '',
                id: ''
            },
            classifyDTO:{
                classification: '',
                id: '',
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
    methods: {
        getData() {
            axios
                .get("/api/classify/allClassify",{
                    headers:{
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                .then(response => {
                    console.log(response)
                    this.classifyInfoList = response.data
                    this.totalItems = response.data.length
                    if (this.totalItems > this.pageSize) {
                        for (let index = 0; index < this.pageSize; index++) {
                            this.tableData.push(this.classifyInfoList[index]);
                        }
                    } else {
                        this.tableData = this.classifyInfoList;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('获取分类结束')
                })
        },
        addClassify(classify) {
            if(classify.classification === ''){
                this.$message({
                    type: 'warning',
                    message: '分类名不能为空'
                });
            } else{
                axios
                    .post("/api/classify/addClassify",{
                        classification: classify.classification,
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
                        console.log("添加分类完成")
                        this.dialogVisible = false
                        this.getData()
                        this.classify.classification = ''
                    })
            }
        },
        handleDelete(id)
        {
            console.log(id)
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    axios
                        .delete("/api/classify/deleteClassify",{
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
        handleEdit(id, classification) {
            this.dialogFormVisible = true
            this.classifyDTO.id = id
            this.classifyDTO.classification = classification
        },
        handleOK() {
            axios
                .put("/api/classify/updateClassify",{
                    id: this.classifyDTO.id,
                    classification: this.classifyDTO.classification,
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
                    this.dialogFormVisible = false
                    this.getData()
                })
        },
        doFilter() {
            this.filterTableData = [];
            this.classifyInfoList.filter((item)=>{
                if('classification' in item){
                    // 按编号或地区查询 注意：根据实际数据 灵活调整字母大小写
                    if (item.classification.toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1) {
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
                this.currentChangePage(this.classifyInfoList);
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
        this.currentPage = 1
        this.currentChangePage(this.classifyInfoList)
    }
}
</script>

<style scoped>

</style>
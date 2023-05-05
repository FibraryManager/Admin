<template>
    <div class="borrowInfo" style="width:100%;" max-height="380">
<!--        <el-button type="primary" size="mini" @click="dialogVisible = true">添加用户</el-button>-->
<!--        <br/>-->
        <el-input
            v-model="searchValue" size="mini" clearable
            placeholder="请输入书籍名称" style="width:300px; margin-bottom: 20px; margin-top: 20px; margin-right: 5px"></el-input>
        <el-button type="primary" size="mini" @click="doFilter">搜索</el-button>
        <el-table :data="tableData" border>
            <el-table-column fixed label="借阅号" sortable :sort-by="['id']" prop="id" width="90px"></el-table-column>
            <el-table-column label="图书编号" sortable :sort-by="['bookId']" prop="bookId" width="110px"></el-table-column>
            <el-table-column label="书籍名称" prop="bookName" width="180px"></el-table-column>
            <el-table-column
                label="借出时间"
                width="180px"
                sortable :sort-by="['borrowTime']"
                prop="borrowTime"
                :formatter="formatterBorrowTime"></el-table-column>
            <el-table-column
                label="应还时间"
                width="180px"
                sortable :sort-by="['returnTime']"
                prop="returnTime"
                :formatter="formatterReturnTime"></el-table-column>
            <el-table-column label="借阅人" prop="nickname" width="120px"></el-table-column>
            <el-table-column label="分类id" sortable :sort-by="['classificationId']" prop="classificationId" width="90px"></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.bookId)">删除</el-button>
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
    </div>
</template>

<script>
import axios from "axios";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Borrow",
    data(){
        return {
            borrowInfoList:[],
            tableData: [],
            searchValue: "",
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
        }
    },
    methods:{
        getData() {
            axios
                .get("/api/borrow/allBorrows",{
                    headers:{
                        Authorization: localStorage.getItem('accessToken')
                    }
                })
                .then(response => {
                    console.log(response)
                    this.borrowInfoList = response.data
                    this.tableData = this.borrowInfoList
                    this.totalItems = response.data.length
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('获取借阅结束')
                })
        },
        formatterBorrowTime (row) {
            const zoneDate = new Date(row.borrowTime).toJSON()
            const date = new Date(+new Date(zoneDate)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').slice(0,10)
            return date
        },
        formatterReturnTime (row) {
            const zoneDate = new Date(row.returnTime).toJSON()
            const date = new Date(+new Date(zoneDate)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').slice(0,10)
            return date
        },
        handleDelete(id)
        {
            console.log(id)
            this.$confirm('此操作将永久删除该借阅记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    axios
                        .delete("/api/borrow/deleteBorrow",{
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
        doFilter() {
            this.filterTableData = [];
            this.borrowInfoList.filter((item)=>{
                if('book_id' in item || 'book_name' in item){
                    // 按编号或地区查询 注意：根据实际数据 灵活调整字母大小写
                    if (item.book_id.toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1
                        || item.book_name.indexOf(this.searchValue) > -1) {
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
                this.currentChangePage(this.borrowInfoList);
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
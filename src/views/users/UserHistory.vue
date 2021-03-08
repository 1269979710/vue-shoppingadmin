<template>
    <div class='index'>
        <!-- 卡片 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>

            </div>
            <div class="text item">
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="uname" class="input-with-select">

                        <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
                    </el-input>
                </div>
                <div class="block">

                    <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>

                    <el-table :data="tableData2" stripe style="width: 100%">
                        <el-table-column prop="id" label="编号" width="180">
                        </el-table-column>
                        <el-table-column prop="username" label="用户" width="180">
                        </el-table-column>
                        <el-table-column prop="type" label="登录方式">
                        </el-table-column>
                        <el-table-column prop="city" label="登录城市">
                        </el-table-column>
                        <el-table-column prop="login_time" label="登录时间">
                        </el-table-column>
                        <el-table-column prop="prev_login_time" label="上一次登录时间">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="5"
                            layout="total, sizes, prev, pager, next, jumper" :total="tableData2Total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getUserHistoryApi } from '@/api/'
export default {
    created () {
        this.initData()
    },
    watch: {
        date (newdata) {
            this.start_time = newdata[0]
            this.end_time = newdata[1]
            this.initData()
        }
    },
    methods: {
        initData () {
            getUserHistoryApi({
                pagenum: this.pagenum,
                pagesize: this.pagesize,
                uname: this.uname,
                start_time: this.start_time,
                end_time: this.end_time
            }).then(res => {
                this.tableData2 = res.data.list
                this.tableData2Total = parseInt(res.data.total)
            })
        },
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.initData()
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.initData()
        }
    },
    data () {
        return {
            pagenum: 1,
            pagesize: 5,
            uname: '',
            start_time: '',
            end_time: '',
            tableData2: [],
            tableData2Total: 0,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            uname: '',
            date: ''
        }
    }
}
</script>
<style scoped lang='scss'>
.index {
    width: 100%;
    .el-card {
        width: 100%;
    }
}
</style>
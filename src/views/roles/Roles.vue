<template>
    <div class="index">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>角色列表</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                    <el-button type="primary" round style="float: right; " @click="jump('/admin/roles/create')">创建用户
                    </el-button>
                </el-button>
            </div>
            <div class="text item">
                <el-table :data="tableData2" stripe style="width: 100%">
                    <el-table-column prop="role_id" label="编号" width="180">
                    </el-table-column>
                    <el-table-column prop="role_name" label="角色名称" width="180">
                    </el-table-column>
                    <el-table-column prop="role_describe" label="角色描述">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button type="primary" circle @click="dialogVisible = true"> -->
                            <el-button type="primary" circle @click="dianjiqxFn(scope.row)">
                                分配权限</el-button>

                            <el-button type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="open(scope.row.role_id)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog title="编辑角色权限" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

                <!-- <el-tree :data="data1" show-checkbox node-key="auth_id" :default-expanded-keys="authids"
                :default-checked-keys="authidsson"
                 :props="defaultProps">
                </el-tree> -->
                <el-tree :data="data1" show-checkbox ref="tree" v-loading="treeLoading" node-key="auth_id"
                    :default-expanded-keys="authids" :default-checked-keys="authidsson" :props="defaultProps">
                </el-tree>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
                    <el-button type="primary" @click="dianjigbFn">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import { getRolesApi, deleteRolesApi, getAuthsApi, putAuthsApi } from '@/api'
export default {
    created () {
        this.initData()
    },
    methods: {
        // getCheckedNodes () {
        //     var rad = ''
        //     var ridsa = this.$refs.tree.getCheckedKeys().join(',')// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
        //     var ridsb = this.$refs.tree.getCheckedNodes()// 获取当前的选中的数据{对象}
        //     ridsb.forEach(ids => {//获取选中的所有的父级id
        //         rad += ',' + ids.pid
        //     })
        //     rad = rad.substr(1) // 删除字符串前面的','
        //     var rids = rad + ',' + ridsa
        //     var arr = rids.split(',')//  把字符串转换成数组
        //     arr = [...new Set(arr)]; // 数组去重
        //     rids = arr.join(',')// 把数组转换成字符串
        //     console.log(rids)
        // },

        dianjigbFn () {
            // this.dialogVisible = true
            let tmpIds = []
            let tmpIdsSon = []
            if (this.$refs.tree.getCheckedNodes()) {
                this.$refs.tree.getCheckedNodes().forEach((firstItem) => {
                    // console.log(firstItem)
                    if (firstItem.auth_id) tmpIds.push(firstItem.auth_id)
                    if (firstItem.auth_id && firstItem.auth_pid != 0) tmpIdsSon.push(firstItem.auth_id)

                    if (firstItem.children) {
                        firstItem.children.forEach((twoItem) => {
                            if (twoItem.auth_id) tmpIds.push(twoItem.auth_id)
                            if (twoItem.auth_id && twoItem.auth_pid != 0) tmpIdsSon.push(twoItem.auth_id)
                        })
                    }
                })
            }
            this.treeLoading = false
            // set ajax
            let auth_ids = [...new Set(tmpIds)].join(',')
            let auth_ids_son = [...new Set(tmpIdsSon)].join(',')

            putAuthsApi({
                role_id: this.roleid,
                auth_ids,
                auth_ids_son
            }).then(res => {
                this.loading = false
                if (res.meta.state == 200) {
                    this.$message.success('操作成功')
                    this.initData()
                    this.dialogVisible = false
                } else {
                    this.$message.error(res.meta.msg);
                }
            })
        },
        dianjiqxFn (a) {
            this.dialogVisible = true
            getAuthsApi()
                .then(res => {
                    if (res.meta.state == 200) {
                        this.data1 = res.data
                    }
                })
            this.roleid = parseInt(a.role_id)

            this.authids = a.auth_ids.split(',')
            this.authidsson = a.auth_ids_son.split(',')
        },
        handleClose (done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },

        open (id) {
            console.log(id)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteRolesApi({
                    role_id: parseInt(id)

                })
                this.initData()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        initData () {
            getRolesApi()
                .then(res => {
                    this.tableData2 = res.data

                })
        }
    },
    data () {
        return {
            treeLoading: false,
            formEditData: {
                role_id: 0
            },
            data1: [],
            data2: [],
            authids1: '',
            authidsson1: '',
            authids: [],
            authidsson: [],
            data1: [],

            defaultProps: {
                children: 'children',
                label: 'auth_name'
            },
            dialogVisible: false,
            tableData2: [],
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
            }]
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
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

.box-card {
    width: 480px;
}
</style>
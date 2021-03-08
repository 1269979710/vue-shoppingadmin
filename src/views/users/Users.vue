<template>
    <div class="index">
        <el-card class="box-card">

            <download-excel class="export-excel-wrapper" :data="tableData2" :fields="json_fields" name="远程诊断报告导出.xls">
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                <el-button type="primary" size="small">导出EXCEL</el-button>
            </download-excel>
            <div slot="header" class="clearfix">
                <span style="float: left;text-align:center ">用户列表</span>
                <el-button type="primary" round style="float: right; " @click="jump('/admin/users/create')">创建用户
                </el-button>
            </div>
            <el-table :data="tableData2" stripe style="width: 100%">
                <el-table-column prop="user_id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="role_name" label="所属角色" width="100">
                </el-table-column>
                <el-table-column prop="username" width="100" label="用户名">
                </el-table-column>
                <el-table-column prop="mobile_phone" label="手机号" width="90">
                </el-table-column>
                <el-table-column label="状态" width="50">
                    <template slot-scope="scope">
                        <el-switch @change="handleSwicth(scope.row.user_id,scope.row.state)" v-model="scope.row.state"
                            active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                        <!-- <template slot-scope="scope">
        //--- 这里取到当前单元格
        <span>{{ scope.row.title }}</span>
        //--- scope.row 直接取到该单元格对象，就是数组里的元素对象，即是tableData[scope.$index]
        //---.title 是对象里面的title属性的值
      </template> -->
                    </template>
                </el-table-column>
                <el-table-column prop="reg_time" label="创建时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" class="caozuo">
                        <!-- <el-button type="primary" circle @click="dialogVisible = true" >分配角色</el-button> -->
                        <el-button type="primary" circle
                            @click="dianjiFn(scope.row.username,scope.row.role_name,scope.row.user_id)">分配角色
                        </el-button>

                        <el-button type="danger" icon="el-icon-delete" circle @click="open(scope.row.user_id)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage4" :page-sizes="[2, 10, 15, 20]" :page-size="2"
                    layout="total, sizes, prev, pager, next, jumper" :total="tableData2Total">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog title="分配角色" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="当前账号">
                    <el-tag type="info">{{createuser}}</el-tag>
                </el-form-item>
                <el-form-item label="当前角色">
                    <el-tag type="info">{{createrole}}</el-tag>
                </el-form-item>
                <el-form-item label="选择角色" prop="age">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
                <el-button type="primary" @click="putrolseFn">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
// import axios from 'axios'
import { getUserApi, deleteUserApi, putUsersStateApi, getRolesApi, putUsersRolesApi } from '@/api'
export default {
    created () {
        this.initData()

    },
    methods: {
        putrolseFn () {
            this.dialogVisible = false
            putUsersRolesApi({
                role_id: parseInt(this.value),
                user_id: parseInt(this.createuserid)
            }).then(res => {
                if (res.meta.state == 200) {
                    alert('成功修改')
                    this.initData()
                } else {
                    alert(res.meta.msg)
                }
            })

        },
        dianjiFn (a, b, c) {
            this.dialogVisible = true
            // console.log(a);
            // console.log(b)
            this.createuser = a
            this.createrole = b
            this.createuserid = c
            getRolesApi()
                .then(res => {
                    let resdata = res.data
                    let a = []
                    let b = {}
                    resdata.forEach((item, index) => {
                        b = { value: item.role_id, label: item.role_name }
                        a.push(b)

                    });
                    this.options = a

                })
        },
        handleSwicth (id, state) {
            console.log(id, state);
            putUsersStateApi({
                user_id: parseInt(id),
                state: parseInt(state)
            }).then(res => {
                if (res.meta.state == 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });

                } else {
                    this.$message({
                        type: 'error',
                        message: res.meta.msg
                    })
                }
                this.initData()
            }

            )

        },

        initData () {

            getUserApi({
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
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        handleClose (done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        open (id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteUserApi({
                    user_id: id
                })
                    .then(res => {
                        if (res.meta.state == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.initData()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.meta.msg
                            });
                        }
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.initData()
            console.log(222);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.initData()
            console.log(1111);
        }

    },
    data () {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            //execl
            json_fields: {
                "名字": "role_name",    //常规字段
                "电话": "mobile_phone", //支持嵌套属性
                "时间": "reg_time", //支持嵌套属性
                "名字2": "username", //支持嵌套属性
                // "头部-损坏区域代码": {
                //     field: "phone.landline",
                //     //自定义回调函数
                //     callback: value => {
                //         return `损坏区域代码 - ${value}`;
                //     }
                // }
            },
            json_data: [
                {
                    name: "损坏的组件一",
                    city: "New York",
                    country: "United States",
                    birthdate: "1978-03-15",
                    phone: {
                        mobile: "1-541-754-3010",
                        landline: "(541) 754-3010"
                    }
                },
                {
                    name: "损坏的组件二",
                    city: "Athens",
                    country: "Greece",
                    birthdate: "1987-11-23",
                    phone: {
                        mobile: "+1 855 275 5071",
                        landline: "(2741) 2621-244"
                    }
                }
            ],
            json_meta: [
                [
                    {
                        " key ": " charset ",
                        " value ": " utf- 8 "
                    }
                ]
            ],

            //excel
            createuserid: '',
            tableData2: [],
            tableData3: [],
            createuser: '',
            createrole: '',
            //switch
            value: true,
            //列表请求参数
            pagenum: 1,
            pagesize: 2,
            uname: '',
            start_time: '',
            end_time: '',
            tableData2: [],
            tableData2Total: 0,
            //创建弹窗数据
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },

            //
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            },
            dialogVisible: false,
            currentPage1: 1,
            currentPage2: 1,
            currentPage3: 5,
            currentPage4: 1,
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
<style lang='scss' scoped>
.index {
    width: 100%;
    .el-card {
        width: 100%;
    }
    .el-pagination {
        width: 100%;
        text-align: right;
        padding: 10px 0;
        background: #cccccc;
        margin-top: 20px;
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
<template>
    <div class="index">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>角色创建</span>
                <el-button type="primary" round style="float: right; text-align:center" @click="jump('/roles')">返回
                </el-button>
            </div>
            <div class="text item">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="rolename">
                        <el-input v-model="ruleForm.rolename"></el-input>
                    </el-form-item>
                    <el-form-item label="角色数据" prop="roledescribe">
                        <el-input v-model="ruleForm.roledescribe"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import { postRolesApi } from '@/api'
export default {
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

            ruleForm: {
                pass: '',
                checkPass: '',
                age: '',
                rolename: '',
                roledescribe: '',
            },
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
            }
        };
    },
    methods: {
        submitForm (formName) {
            postRolesApi({
                role_name: this.ruleForm.rolename,
                role_describe: this.ruleForm.roledescribe
            }).then(res => {
                console.log(res);
                if (res.meta.state == 201) {
                    alert('创建成功!');
                } else {
                    alert(res.meta.msg)
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style scoped lang='scss'>
.index {
    width: 100%;
    .el-card {
        width: 100%;
        .clearfix {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
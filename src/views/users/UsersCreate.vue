<template>
    <div class="index">

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>用户创建</span>
                    <el-button type="primary" round style="float: right; " @click="jump('/admin/users')">返回</el-button>
                </div>

                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="Pass">
                    <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密保问题" prop="question">
                    <el-select v-model="ruleForm.question" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密保答案" prop="answer">
                    <el-input v-model.number="ruleForm.answer"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-card>

        </el-form>
    </div>
</template>
<script>
import { postUserApi } from '@/api/'
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
                age: '',
                username: '',
                question: '',
                answer: ''

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
            postUserApi({
                username: this.ruleForm.username,
                password: this.ruleForm.Pass,
                mobile: "22222",
                question: this.ruleForm.question,
                answer: this.ruleForm.answer,
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
    .el-form {
        width: 100%;
        .el-card {
            width: 100%;
        }
    }
    .el-select {
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
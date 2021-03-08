<template>
    <div class='index '>
        <vue-particles style="position:absolute;left:0px;top:0px;width:100%;height:100%;" color="#fff"
            :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" :particleSize="4" linesColor="#fff"
            :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2"
            :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi">
        </vue-particles>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px"
            class="demo-ruleForm animated tada">
            <el-form-item>
                <el-select v-model="value" placeholder="请选择密保问题">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input type="text" clearable prefix-icon="el-icon-search" placeholder="请选择密保答案"
                    v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" clearable prefix-icon="el-icon-user-solid" placeholder="请输入用户名"
                    v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" clearable show-password
                    v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button1" type="primary" icon="el-icon-camera" @click="open"></el-button>
                <el-button class="button1" type="primary" icon="el-icon-mobile-phone" @click="open1"></el-button>
                <el-button class="button2" type="primary" @click="submitForm('ruleForm')">提交</el-button>

            </el-form-item>
        </el-form>

        <!-- 扫码 -->
        <el-dialog title="扫码登录京西商城" :visible.sync="QRcode.dialogVisible" :close-on-click-modal="true" width="300px"
            height="450px" top="200px">
            <div class="qrcode" ref="qrCodeUrl"></div>
        </el-dialog>

    </div>
</template>
<script>
import { postLoginApi, postLoginsmApi } from '@/api'
import QRCode from 'qrcodejs2'
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
            QRcode: {
                dialogVisible: false,
                uuid: '',
                t: null,
            },
            //select标签
            options: [{
                value: '您其中一位老师的名字',
                label: '您其中一位老师的名字'
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
                value: '选项1',
                label: '黄金糕'
            }],
            value: '',
            //form标签
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
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
    watch: {
        QRcode: {
            handler (data) {
                // 控制取消定时器
                if (data.dialogVisible) {
                    // TODO. 避免重复渲染
                    if (this.t) return

                    this.t = setInterval(() => {
                        postLoginsmApi({ state: this.QRcode.uuid })
                            .then(res => {
                                console.log(res.meta)

                                if (res.meta.state == 200) {
                                    localStorage.setItem("token", res.data.token)
                                    localStorage.setItem("uname", res.data.uname)
                                    localStorage.setItem("roleName", res.data.roleName)
                                    // this.$store.commit('users/setUserinfo', {
                                    //     token: res.data.token,
                                    //     uname: res.data.uname,
                                    //     roleName: res.data.roleName
                                    // })

                                    // 提示登录成功
                                    this.$message.success(res.meta.msg);
                                    // 跳转用编程式导航
                                    this.$router.push({ path: '/' })
                                    // 清除定时器
                                    clearInterval(this.t)
                                    this.t = null
                                }
                            })
                    }, 2000)
                } else {
                    clearInterval(this.t)
                    this.t = null
                }
            },
            deep: true,
        }
    },
    methods: {
        uuid () {
            let s = [];
            let hexDigits = "0123456789abcdef";
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            let uuid = s.join("");
            return (new Date).getTime() + "-" + uuid;
        },
        //扫码
        open () {
            this.QRcode.dialogVisible = true

            this.$nextTick(() => {

                this.$refs.qrCodeUrl.innerHTML = ''

                this.QRcode.uuid = this.uuid()

                let qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxed58e834201d0894&redirect_uri=http://kg.zhaodashen.cn/v2/qr/login.php&response_type=code&scope=snsapi_base&state=${this.QRcode.uuid}&connect_redirect=1#wechat_redirect`,
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            })
        },
        open1 () {
            this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${action}`
                    });
                }
            });
        },
        submitForm (formName) {
            postLoginApi({
                uname: this.ruleForm.checkPass,
                pwd: this.ruleForm.age,
                question: this.value,
                answer: this.ruleForm.pass,
            }).then(res => {

                console.log(res)
                if (res.meta.state == 200) {
                    this.$message({
                        message: '登录成功，正在跳转',
                        type: 'success'
                    });
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("roleName", res.data.roleName)
                    localStorage.setItem("uname", res.data.uname)
                    this.$router.push({ path: '/' })
                } else {
                    this.$message.error(res.meta.msg);
                }
            })
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }

}
</script>
<style lang='scss' scoped>
.index {
    width: 100%;
    height: 100%;
    background: #2d3a4b;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-form {
        min-height: 100px;
        width: 300px;
        .el-button.button2 {
            width: 170px !important;
        }
        .el-button.button1 {
            width: 55px !important;
        }
    }

    .el-select {
        width: 100%;
    }
    .el-form .el-button {
        width: 100%;
    }
}
</style>
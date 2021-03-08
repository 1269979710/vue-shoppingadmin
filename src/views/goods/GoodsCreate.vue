<template>
    <div class="index">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>创建商品</span>
                <el-button style="float: right; padding: 3px 0" type="primary" circle>返回</el-button>
            </div>
            <div class="text item">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="first">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                            class="demo-ruleForm">
                            <el-form-item style='width:600px' label="商品名称">
                                <el-input v-model="ruleForm.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item class="num" label="商品数量" prop="age">
                                <el-input v-model.number="ruleForm.age"></el-input>
                            </el-form-item>
                            <el-form-item class="num" label="商品价格" prop="age">
                                <el-input v-model.number="ruleForm.price"></el-input>
                            </el-form-item>
                            <el-form-item class="num" label="促销价格" prop="age">
                                <el-input v-model.number="ruleForm.price2"></el-input>
                            </el-form-item>
                            <el-form-item class="num" label="所属分类">
                                <div class="block">

                                    <el-cascader v-model="value" :options="options"
                                        :props="{label:'cat_name',value:'cat_id'}" @change="handleChange">
                                    </el-cascader>
                                </div>
                            </el-form-item>

                            <el-form-item>
                                <el-upload class="avatar-uploader" action="http://kg.zhaodashen.cn/v2/upload.php"
                                    :show-file-list="false" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="商品描述" name="second">
                        <Editor @input="handelIncrease"></Editor>
                    </el-tab-pane>

                    <el-tab-pane label="商品相册" name="third">商品相册</el-tab-pane>
                    <el-tab-pane label="商品属性" name="fourth">商品属性</el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
        <!-- <div class="ceshi">
            <img :src="imageUrl" id="img">
        </div> -->
    </div>
</template>
<script>
import Editor from "@/components/Editor";
import { getCateApi, postGoodsCreateApi } from '@/api'
export default {
    components: {
        Editor
    },
    created () {
        this.initData()
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
                    callback();
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
        }
        return {
            pagenum: 1,
            pagesize: 1000,
            value: [],
            options: [],
            imageUrl: '',
            sss: '',
            imgurl: '',
            ruleForm: {
                pass: '',
                age: '',
                price: '',
                price2: '',
                num: '',
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
            },

            activeName: 'first'
        };
    },
    methods: {
        handelIncrease (step) {
            console.log("step", step)
        },
        initData () {

            getCateApi({
                pagenum: this.pagenum,
                pagesize: this.pagesize,
            }).then(res => {

                this.options = res.data.list

            })
        },
        handleChange (value) {
            console.log(value);
        },

        handleAvatarSuccess (res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);

            // this.imgurl = res.data.url + "/" + res.data.img
            this.imgurl = res.data.img


        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;


        },
        // beforeUp (file) {

        //     var reader = new FileReader();
        //     reader.onload = function (event) {
        //         var txt = event.target.result;
        //         var img = document.createElement("img");
        //         img.src = txt;
        //         img.onload = function () {
        //             console.log(img.width);
        //             console.log(img.height);
        //             let w = parseFloat(img.width)
        //             let h = parseFloat(img.height)
        //             if (w > 472 || h > 303) {
        //                 if (w < h) {
        //                     document.querySelector('#img').style.height = '303px'

        //                 } else {
        //                     document.querySelector('#img').style.width = '472px'
        //                 }
        //             }
        //         }
        //     };
        //     reader.readAsDataURL(file);
        // },
        submitForm (formName) {
            postGoodsCreateApi({
                goods_name: this.ruleForm.pass,
                goods_number: parseInt(this.ruleForm.age),
                market_price: parseFloat(this.ruleForm.price),
                shop_price: parseFloat(this.ruleForm.price2),
                cat_id: parseInt(this.value),
                thumb: this.imgurl,
            })
                .then(res => {

                })
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
        handleClick (tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style scoped lang='scss'>
.index {
    width: 100%;
    .el-card {
        width: 100%;
        // overflow: hidden;
        .num {
            width: 405px;
        }
        .el-button {
            width: 60px;
        }
        .avatar-uploader .el-icon-plus {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            // float: right;
            position: absolute;
            left: 320px;
            top: -185px;
        }
        .avatar-uploader .el-icon-plus:hover {
            border-color: #409eff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
            position: absolute;
            top: -189px;
            left: 318px;
        }
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
.ceshi {
    width: 470px;
    height: 301px;
    border: 1px solid blue;
    position: absolute;
}
</style>


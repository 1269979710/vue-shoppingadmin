<template>
    <div class="index ">
        <!-- <div class="welcome">
            <div class="text">Hi，欢迎使用应用管理平台!</div>
            <div class="tip">轻松创建、部署、和管理你的应用，提升研发效率，降低业务成本。
                <svg-icon icon-class="education" /><span class="guide" @click.prevent.stop="guide()">开启引导</span>
            </div>
        </div> -->
        <el-card class="box-card ">
            <div slot="header" class="clearfix">
                <span>订单统计</span>
                <el-button style="float: right; padding: 3px 0" type="primary" circle>返回</el-button>
            </div>
            <div class="text item">
                <el-input placeholder="请输入内容" v-model="consignee" class="input-with-select">

                    <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
                </el-input>

                <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <div id="demo1">
                    <div id="main" ref="zxy" style="width: 900px;height:400px;">111</div>
                </div>

            </div>
        </el-card>
    </div>
</template>
<script>

import guide from '@/utils/guide'
import { getGoodsTotal } from '@/api';
export default {

    created () {
        this.initData()
    },
    mounted () {
        this.drawLine();
        this.$driver.defineSteps(guide);
        this.$driver.start();
    },
    watch: {
        // tbdata (newdata) {
        //     this.drawLine();
        // },
        value1 (newdata) {
            this.start_time = newdata[0]
            this.end_time = newdata[1]
            this.initData()
        }
    },
    methods: {

        initData () {
            getGoodsTotal({
                consignee: this.consignee,
                start_time: this.start_time,
                end_time: this.end_time,
            }).then(res => {
                console.log(res);
                this.tbdata = res.data.data
                this.tbtitle = res.data.title
                this.drawLine();
            })
        },
        drawLine () {
            let echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            // let myChart = this.$echarts.init(document.getElementById('myChart'))
            // let myChart = this.$echarts.init(this.$refs.zxy)
            let myChart = echarts.init(this.$refs.zxy);
            // 绘制图表
            let option = {
                // title: {
                //     text: 'ECharts 入门示例'
                // },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: this.tbtitle
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: this.tbdata
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        }
    },
    data () {
        return {
            tbdata: [],
            tbtitle: [],
            consignee: '',
            start_time: '',
            end_time: '',
            msg: 'Welcome to Your Vue.js App',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value1: [],
            value2: '',
            input1: '',
            input2: '',
            input3: '',
            select: ''
        };
    }
}
</script>
<style scoped lang='scss'>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.index {
    width: 100%;
    .el-card {
        width: 100%;
        // overflow: hidden;
        .el-button {
            width: 60px;
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
</style>
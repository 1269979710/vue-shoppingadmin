<template>
    <div class="index">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>请输入商品名</span>
                <el-button style="float: right; padding: 3px 0" type="primary" circle>创建</el-button>
            </div>
            <div class="text item">
                <el-input placeholder="请输入内容" v-model="goods_name">

                    <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
                </el-input>

                <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>

                <el-table :data="data2" stripe style="width: 100%">
                    <el-table-column prop="cat_id" label="编号" width="100">
                    </el-table-column>
                    <el-table-column prop="cat_name" label="分类名称" width="100">
                    </el-table-column>
                    <el-table-column label="图片" width="250">
                        <template slot-scope="item">
                            <img :src="'http://tmp00001.zhaodashen.cn/'+item.row.goods_img" width="80" height="80" />
                        </template>

                    </el-table-column>
                    <el-table-column prop="goods_name" label="标题">
                    </el-table-column>
                    <el-table-column prop="goods_number" label="库存">
                    </el-table-column>
                    <el-table-column prop="market_price" label="价格">
                    </el-table-column>
                    <el-table-column prop="shop_price" label="促销价">
                    </el-table-column>
                    <el-table-column prop="add_time" label="创建于">
                    </el-table-column>
                    <el-table-column prop="is_sell" label="上架">
                    </el-table-column>
                    <el-table-column prop="is_hot" label="热卖">
                    </el-table-column>
                    <el-table-column prop="is_best" label="推荐">
                    </el-table-column>
                    <el-table-column prop="is_new" label="新品">
                    </el-table-column>
                    <el-table-column prop="name" label="操作" fixed="right" width="120">
                        <el-button class="button1" type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button class="button1" type="danger" icon="el-icon-delete" circle></el-button>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <span class="demonstration">完整功能</span>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage4" :page-sizes="[2, 10, 15, 20]" :page-size="2"
                    layout="total, sizes, prev, pager, next, jumper" :total="total2">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getGoodsApi } from '@/api'
import { mapState, mapActions } from 'vuex';
export default {
    created () {
        this.initData()
    },
    computed: {
        ...mapState({
            data2: state => state.goods.initData,
            total2: state => state.goods.total,

        })
    },
    methods: {
        ...mapActions({
            apiFn: 'goods/setInitData'
        }),
        initData () {
            this.apiFn({
                pagenum: this.pagenum,
                pagesize: this.pagesize,
                start_time: this.start_time,
                end_time: this.end_time,
                goods_name: this.goods_name,
                is_delete: this.is_delete,
            })
            // getGoodsApi({
            //     pagenum: this.pagenum,
            //     pagesize: this.pagesize,
            //     start_time: this.start_time,
            //     end_time: this.end_time,
            //     goods_name: this.goods_name,
            //     is_delete: this.is_delete,
            // }).then(res => {
            //     console.log(res);
            //     this.data2 = res.data.list
            //     this.total2 = parseInt(res.data.total)
            // })
        },
        handleSizeChange (val) {
            this.pagesize = val
            this.initData()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            this.pagenum = val
            console.log(this.pagenum);
            this.initData()
            console.log(`当前页: ${val}`);
        }
    },
    data () {
        return {
            // data2: [],
            // total2: 0,
            input1: '',
            input2: '',
            input3: '',
            select: '',
            pagenum: 1,
            pagesize: 2,
            start_time: '',
            end_time: '',
            goods_name: '',
            is_delete: 0,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 1,
            tableData2: [],
            tableData2Total: 0,

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
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: '',
        }
    }
}
</script>
<style scoped lang='scss'>
.index {
    width: 100%;
    .el-card {
        width: 100%;
        overflow: hidden;
        .el-button {
            width: 60px;
        }
        .el-input {
            float: left;
            width: 350px;
        }
        .el-date-editor {
            float: right;
        }
        .button1 {
            width: 40px;
        }
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
<template>
    <div class="index">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>权限列表</span>

            </div>
            <div class="text item">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>

                <el-tree class="filter-tree" :data="data1" :props="defaultProps" default-expand-all
                    :filter-node-method="filterNode" ref="tree">
                </el-tree>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getAuthsApi } from '@/api'
export default {
    created () {
        getAuthsApi()
            .then(res => {
                if (res.meta.state == 200) {
                    this.data1 = res.data
                }
            })
    },
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
        filterNode (value, data) {
            if (!value) return true;
            return data.auth_name.indexOf(value) !== -1;
        }
    },

    data () {
        return {
            data1: [],
            filterText: '',
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'auth_name'
            }
        };
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
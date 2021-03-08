<template>
    <div class="index">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>创建商品</span>
                <el-button style="float: right; padding: 3px 0" type="primary" circle>返回</el-button>
            </div>
            <div class="text item">

            </div>
        </el-card>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped lang='scss'>
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
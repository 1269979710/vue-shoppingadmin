<template>
    <div class="index">
        <!-- 导航 -->
        <div class="menu" v-bind:style='{width:menuWidth}'>
            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group> -->
            <el-menu text-color='#BFCBD9' background-color='#263445' default-active="1-4-1"
                class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">后台首页</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="1-1"><i class="iconfont icon-shezhi"></i>欢迎页</el-menu-item>
                        <el-menu-item index="1-2" @click="jump('/admin/users/history')"><i
                                class="iconfont icon-shezhi"></i>访客记录
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">商品分类</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="2-1" @click="jump('/admin/goodslevel')"><i
                                class="iconfont icon-shezhi"></i>分类列表</el-menu-item>
                        <el-menu-item index="2-2" @click="jump('/admin')"><i class="iconfont icon-shezhi"></i>创建列表
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">商品属性</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="3-1"><i class="iconfont icon-shezhi"></i>商品类型</el-menu-item>
                        <el-menu-item index="3-2" @click="jump('/admin/users/history')"><i
                                class="iconfont icon-shezhi"></i>类型创建
                        </el-menu-item>
                        <el-menu-item index="3-3" @click="jump('/admin/users/history')"><i
                                class="iconfont icon-shezhi"></i>商品属性
                        </el-menu-item>
                        <el-menu-item index="3-4" @click="jump('/admin/users/history')"><i
                                class="iconfont icon-shezhi"></i>属性创建
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">商品管理</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="4-1" @click="jump('/admin/goods')"><i class="iconfont icon-shezhi"></i>商品列表
                        </el-menu-item>
                        <el-menu-item index="4-2" @click="jump('/admin/goods/create')"><i
                                class="iconfont icon-shezhi"></i>商品创建
                        </el-menu-item>
                        <el-menu-item index="4-3" @click="jump('/admin/goods/clcyle')"><i
                                class="iconfont icon-shezhi"></i>商品回收站
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">订单管理</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="5-1"><i class="iconfont icon-shezhi"></i>订单管理</el-menu-item>
                        <el-menu-item index="5-2" @click="jump('/admin/users/history')"><i
                                class="iconfont icon-shezhi"></i>订单回收站
                        </el-menu-item>
                        <el-menu-item index="5-3" @click="jump('/admin/orders/totals')"><i
                                class="iconfont icon-shezhi"></i>订单统计
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="6-1" @click="jump('/admin/users')"><i class="iconfont icon-shezhi"></i>用户列表
                        </el-menu-item>
                        <el-menu-item index="6-2" @click="jump('/admin/users/create')"><i
                                class="iconfont icon-shezhi"></i>用户创建
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">角色管理</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="7-1" @click="jump('/admin/roles')"><i class="iconfont icon-shezhi"></i>角色列表
                        </el-menu-item>
                        <el-menu-item index="7-2" @click="jump('/admin/roles/create')"><i
                                class="iconfont icon-shezhi"></i>角色创建
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
                        <i class="iconfont icon-caidan"></i>
                        <span slot="title">权限管理</span>
                    </template>
                    <el-menu-item-group>
                        <i slot="title"></i>
                        <el-menu-item index="8-1" @click="jump('/admin/auths')"><i class="iconfont icon-shezhi"></i>权限列表
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </div>
        <!-- 主体 -->
        <div class="main">
            <div class="top">
                <div class="l">
                    <div class="btn">
                        <i v-bind:class="menuIcon" @click="maueFn"></i>
                    </div>
                    <div class="breadcrumb">
                        <Breadcrumb v-bind:name1="name1" v-bind:name2="name2" />

                    </div>
                </div>
                <div class="r">
                    <div class="iconfont icon-quanping" @click="handleFullScreen"></div>
                </div>
            </div>
            <div class=" content">
                <!-- <router-view></router-view> -->
                <transition appear name='fade-transform' mode="out-in">
                    <router-view></router-view>
                </transition>

            </div>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'

import { getAuthsApi } from '@/api'
export default {
    components: {
        Breadcrumb
    },
    created () {
        console.log(this.$router)
        this.name1 = this.$router.app._route.meta.name1
        this.name2 = this.$router.app._route.meta.name2

        // 获取菜单
        getAuthsApi()
            .then(res => {
                console.log(res.data)
            })
    },
    watch: {
        // 监控路由数据变化重置面包屑
        $route (newData, oldData) {
            this.name1 = newData.meta.name1
            this.name2 = newData.meta.name2
        }
    },
    data () {
        return {
            // 面包屑
            name1: '后台首页',
            name2: '欢迎页',
            changeMenuIcon: 'el-icon-s-fold',  // 菜单默认图标
            menuWStyle: '200px', // 菜单默认宽度
            isHiddenMenu: false, // 是否隐藏菜单

            menuWidth: '200px',
            isCollapse: false,
            menuIcon: 'el-icon-s-fold'
        };
    },
    methods: {
        handleFullScreen () {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        //控制菜单
        maueFn () {
            this.isCollapse = !this.isCollapse
            this.menuWidth = this.isCollapse ? '64px' : '200px'
            this.menuIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
        },
        handleOpen (key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang='scss' scoped>
// global transition css

/* fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-move {
    transition: all 0.5s;
}

.breadcrumb-leave-active {
    position: absolute;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.index {
    width: 100%;
    height: 100%;
    // background: red;
    display: flex;
    overflow: hidden;
    .menu {
        transition: width 1s;
        width: 200px;
        height: 100%;
        background: #263445;
        .el-menu {
            border-right: solid 0px #e6e6e6;
        }
        .iconfont {
            margin-right: 5px;
        }
    }
    .main {
        flex: 1;

        overflow-x: hidden;
        overflow-y: scroll;
        .top {
            width: 100%;
            height: 50px;
            // background: pink;
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            .l {
                width: 300px;
                height: 100%;
                float: left;
                // background: blue;
                .btn {
                    width: 50px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    background: white;
                    float: left;
                    font-size: 30px;
                    cursor: pointer;
                }
                .breadcrumb {
                    width: 200px;
                    height: 50px;
                    // background: red;
                    float: left;
                }
            }
            .r {
                width: 240px;
                height: 100%;
                // background: black;
                float: right;
                .icon-quanping {
                    float: right;
                    font-size: 50px;
                }
            }
        }
        .content {
            text-align: left;
            width: 96%;
            min-height: 100px;
            background: #fff;
            margin: auto;
            margin-top: 20px;
        }
    }
}
</style>
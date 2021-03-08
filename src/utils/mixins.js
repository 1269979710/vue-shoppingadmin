import Vue from 'vue'
Vue.mixin({
    methods: {
        jump (url) {
            // if(this.$router.app.$route.path==url)return
            this.$router.push({ path: url })
        }
    }

})
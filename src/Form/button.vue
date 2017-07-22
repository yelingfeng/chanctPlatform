<template>
    <el-button type="primary"  v-if="option.popover" v-popover:option.popover :disabled="option.disabled" @click.native="clickHandler">{{option.value}}</el-button>
    <el-button type="primary"  v-else   :disabled="option.disabled" @click.native="clickHandler">{{option.value}}</el-button>
</template>
<script>
    export default {
        name: 'button',
        props: [
            'option'
        ],
        data () {
            return {}
        },
        created () {
        },
        mounted () {

        },
        components: {},
        watch: {},
        methods: {
            clickHandler () {
                if (this.option.click && _.isFunction(this.option.click)) {
                    this.option.click();
                }
            },
            getValue () {
                return { [this.option.id]: this.option.value };
            }
        }
    }
</script>
<style>

</style>

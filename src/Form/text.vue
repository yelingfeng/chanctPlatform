<template>
    <el-input v-model="value"
              :disabled="option.disabled"
              :placeholder="placeholder"
              auto-complete="on"
              :style = "widthStyle"
              :type = "option.iptType"
              :rows = "option.rows"></el-input>
</template>
<script>
    export default {
        name: 'text',
        props: [
            'option'
        ],
        data () {
            return {
                value: '',
                placeholder: ''
            }
        },
        watch: {
            'option.value': {
                deep: true,
                handler (newVal) {
                    this.value = newVal;
                }
            }
        },
        mounted () {
            this.value = this.option.value;
            this.placeholder = this.option.placeholder ? this.option.placeholder : '请输入内容'
        },
        computed: {
            widthStyle () {
                return {
                    width: this.option.width + 'px'
                }
            }
        },
        methods: {
            getValue () {
                return { [this.option.id]: this.value || '' };
            },
            setValue (val) {
                if (val) {
                    this.value = val;
                }
            }
        }
    }
</script>
<style>

</style>

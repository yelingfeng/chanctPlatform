<template>
    <el-checkbox-group v-model="value" :disabled="option.disabled" @change="changeHandler">
        <el-checkbox v-for="item in option.data" :key="item.name" :label="item.value" name="type">{{item.name}}</el-checkbox>
    </el-checkbox-group>
</template>
<script>
    export default {
        name: 'checkbox',
        props: [
            'option'
        ],
        data () {
            return {
                value: []
            }
        },
        created () {
        },
        mounted () {
            this.value = this.option.value;
        },
        components: {},
        watch: {},
        methods: {
            changeHandler (value) {
                if (this.option.change && _.isFunction(this.option.change)) {
                    this.option.change(value);
                }
            },
            getValue () {
                return { [this.option.id]: this.value };
            },
            setValue (val) {
                if (val && _.isArray(val)) {
                    this.value = val;
                }
            }
        }
    }
</script>
<style>

</style>

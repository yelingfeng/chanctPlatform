<template>
    <el-select v-model='value' :disabled="option.disabled" :multiple = "option.multiple" @change="changeHandler" :style="widthStyle">
        <el-option v-for="item in data" :key="item.name" :label="item.name" :value="item.value"></el-option>
    </el-select>
</template>
<script>
    export default {
        name: 'select',
        props: [
            'option'
        ],
        data () {
            return {
                value: '',
                data: []
            }
        },
        mounted () {
            this.value = this.option.value;
            this.groupData(this.option.data);
        },
        watch: {
            'option.data': {
                deep: true,
                handler (newVal) {
                    this.groupData(newVal);
                }
            }
        },
        computed: {
            widthStyle () {
                return {
                    width: this.option.width + 'px'
                }
            }
        },
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
                if (val) this.value = val;
            },
            groupData (data = []) {
                let list = [];
                if (this.option.isAll) {
                    list.push({
                        name: '全部',
                        value: ''
                    })
                }
                this.data = _.concat(list, data);
            }
        }
    }
</script>
<style>

</style>

<template>
    <div class="yq-form__date" :style = "widthStyle">
        <el-date-picker v-if="type=='datetime'" v-model="value" type="datetime" @change="changeHandler" placeholder="选择日期时间" :picker-options="option.pickOptions"></el-date-picker>
        <el-date-picker v-if="type=='datetimerange'" v-model="value" type="datetimerange" placeholder="选择日期时间" :picker-options="option.pickOptions"></el-date-picker>
        <el-date-picker v-if="type=='date'" v-model="value" type="date" placeholder="选择日期" :picker-options="option.pickOptions"></el-date-picker>
        <el-date-picker v-if="type=='year'" v-model="value" type="year" placeholder="选择年" :picker-options="option.pickOptions"></el-date-picker>
        <el-date-picker v-if="type=='month'" v-model="value" type="month" placeholder="选择月" :picker-options="option.pickOptions"></el-date-picker>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        name: 'date',
        props: [
            'option'
        ],
        data () {
            return {
                value: '',
                type: '',
                pickerOptions2: {
                    disabledDate (time) {
                        let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                        let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
//                        console.log(cDate);
//                        console.log(cTime);
                        // console.log(moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss'));
                        return !moment(cTime).isBetween(pDate, cDate);
                    }
                }
            }
        },
        mounted () {
            this.value = this.option.value;
            this.type = this.option.type;
        },
        watch: {
            'option.value': {
                deep: true,
                handler (newVal) {
                    this.value = newVal;
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
            getValue () {
                let format;
                switch (this.type) {
                    case 'datetime':
                        format = 'YYYY-MM-DD HH:mm:ss';
                        break;
                    case 'datetimerange':
                        format = 'YYYY-MM-DD HH:mm:ss';
                        break;
                    case 'date':
                        format = 'YYYY-MM-DD';
                        break;
                    case 'year':
                        format = 'YYYY';
                        break;
                    case 'month':
                        format = 'YYYY-MM';
                        break;
                    default:;
                }
                if (this.value === '' || !this.value) {
                    return { [this.option.id]: this.value || '' };
                }
                return { [this.option.id]: moment(this.value).format(format) };
            },
            setValue (val) {
                if (val) {
                    this.value = val;
                }
            },
            changeHandler (value) {
                if (this.option.change && _.isFunction(this.option.change)) {
                    this.option.change(value);
                }
            }
        }
    }
</script>
<style>

</style>

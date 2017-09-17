<script>
    import textComp from './text'
    import textNumberComp from './textNumber'
    import dateComp from './date'
    import selectComp from './select'
    import radioComp from './radio'
    import checkBoxComp from './checkbox'
    import switchComp from './switch'
    import buttonComp from './button'
    import keywordComp from './keyWord'
    export default {
        name: 'xForm',
        props: [
            'option'
        ],
        data () {
            return {
                // form label标签默认居右
                labelPos: '',
                labelWidth: null,
                temArray: [],
                sliderUp: true,
                wrapIndex: [],
                btnIndex: []
            }
        },
        created () {
            if (this.option.canSlider && this.option.items.length >= 3) {
                this.option.items.map((item, index) => {
                    if (item.wrap) {
                        this.wrapIndex.push(index)
                    }
                    if (item.type === 'button') {
                        this.btnIndex.push(index)
                    }
                })
                this.slider()
            }
        },
        mounted () {
            this.labelPos = this.option.labelPos || 'right';
            if (this.option.labelWidth) {
                this.labelWidth = this.option.labelWidth + 'px'
            }
        },
        computed: {
            formOpt () {
                return this.option;
            },
            sliderClass () {
                return !this.sliderUp ? 'slider-up el-icon-caret-bottom' : 'slider-up el-icon-caret-top'
            }
        },
        components: {
            textComp,
            textNumberComp,
            dateComp,
            selectComp,
            radioComp,
            checkBoxComp,
            switchComp,
            buttonComp,
            keywordComp
        },
        /* eslint-disable no-unused-vars */
        render (h) {
            let elItems, elBtns;
            let elSlider;
            let me = this;
            let br = <br />;
            elItems = me.formOpt.items.map((it, index) => {
                let comp;
                let ref = 'comp' + index;
                switch (it.type) {
                    case 'text':
                        comp = <textComp option={it.comOpt} ref={ref}></textComp>
                        break;
                    case 'textNumber':
                        comp = <textNumberComp option={it.comOpt} ref={ref}></textNumberComp>
                        break;
                    case 'date':
                        comp = <dateComp option={it.comOpt} ref={ref}></dateComp>
                        break;
                    case 'select':
                        comp = <selectComp option={it.comOpt} ref={ref}></selectComp>
                        break;
                    case 'radio':
                        comp = <radioComp option={it.comOpt} ref={ref}></radioComp>
                        break;
                    case 'checkbox':
                        comp = <checkBoxComp option={it.comOpt} ref={ref}></checkBoxComp>
                        break;
                    case 'switch':
                        comp = <switchComp option={it.comOpt} ref={ref}></switchComp>
                        break;
                    case 'keyWord':
                        comp = <keywordComp option={it.comOpt} ref={ref}></keywordComp>
                        break;
                    case 'button':
                        comp = <buttonComp option={it.comOpt} ref={ref}></buttonComp>
                        break;
                    default:break;
                }
                let formBox;
                if (it.comOpt.show === undefined || it.comOpt.show) {
                    formBox = <el-form-item label={it.label}>
                                {comp}
                             </el-form-item>
                }
                if (it.wrap) {
                    return <span>{formBox} {br}</span>
                }
                return formBox
            })
            if (me.formOpt.btns && _.isArray(me.formOpt.btns)) {
                elBtns = me.formOpt.btns.map((it, index) => {
                    let comp, formBox;
                    let ref = 'btn' + index;
                    comp = <buttonComp option={it.comOpt} ref={ref}></buttonComp>
                    if (it.comOpt.show === undefined || it.comOpt.show) {
                        formBox = <el-form-item label={it.label}>
                        {comp}
                    </el-form-item>
                    }
                    if (it.wrap) {
                        return <span>{formBox} {br}</span>
                    }
                    return formBox
                });
                if (this.formOpt.btnPos === 'right') {
                    elBtns = <div class='yq-form__btns'>{elBtns}</div>
                }
            }
            elSlider = me.formOpt.canSlider ? <i class={this.sliderClass} onClick={this.slider}></i> : ''
            return (
                <div class='yq-form'>
                     {elSlider}
                    <el-form inline={this.formOpt.inline} label-position={this.labelPos}
                        label-width={this.labelWidth} ref='form' >
                        {elItems}
                        {elBtns}
                    </el-form>
                </div>
            )
        },
        methods: {
            getValue () {
                let me = this;
                let returnData = {};
                me.formOpt.items.forEach((it, index) => {
                    if (it.show === undefined || it.show) {
                        if (me.$refs['comp' + index]) {
                            if (_.isFunction(me.$refs['comp' + index].getValue)) {
                                _.assign(returnData, me.$refs['comp' + index].getValue());
                            }
                        }
                    }
                });
                return returnData;
            },
            // data: [{id: 'text1', value: '22'},{id: 'checkbox1', value: ['1', '2']}]
            setValue (data) {
                let me = this;
                this.formOpt.items.forEach((it, index) => {
                    data.forEach(d => {
                        if (it.comOpt.id === d.id) {
                            me.$nextTick(() => {
                                me.$refs['comp' + index].setValue(d.value);
                            })
                        }
                    })
                });
            },
            // 获得当前form容器的高度
            getContainerHeight () {
                return $(this.$el).height()
            },
            setItemData (id, data) {
                let me = this;
                this.formOpt.items.forEach(it => {
                    if (it.comOpt.id === id) {
                        it.comOpt.data = data;
                    }
                });
            },
            // 设置form元素item属性
            setOtherAttribute (id, attr, data) {
                let me = this;
                this.formOpt.items.forEach(it => {
                    if (it.comOpt.id === id) {
                        it.comOpt[attr] = data;
                    }
                });
            },
            slider () {
                const LEN = this.formOpt.items.length
                let btnLen = this.btnIndex.length
                let INDEX = this.wrapIndex[0] + 1
                if (this.sliderUp) {
                    this.temArray = this.formOpt.items.slice(INDEX, LEN - btnLen)
                    this.formOpt.items.splice(INDEX, LEN - INDEX - btnLen)
                    this.formOpt.items[INDEX - 1].wrap = false
                    this.sliderUp = !this.sliderUp
                } else if (!this.sliderUp) {
                    this.formOpt.items.splice(INDEX, 0, ...this.temArray)
                    this.formOpt.items[INDEX - 1].wrap = true
                    this.sliderUp = !this.sliderUp
                }
            }
        }
    }
</script>
<style>
    @component-namespace yq {
        @b form {
            position: relative;
            @e btns {
                position: absolute;
                right: 10px;
                bottom: 0;
            }
        }
    }
    .slider-up {
       display: block;
       position: absolute;
       top: 10px;
       right: 30px;
       width: 40px;
       height: 20px;
       color: #fff;
       font-size: 20px;
       z-index: 10;
   }
</style>

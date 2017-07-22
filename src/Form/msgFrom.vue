<script>
    import textComp from 'components/Form/text'
    import dateComp from 'components/Form/date'
    import selectComp from 'components/Form/select'
    import buttonComp from 'components/Form/button'
    export default {
        name: 'form',
        props: [
            'option'
        ],
        data () {
            return {
                // form label标签默认居右
                labelPos: '',
                labelWidth: null
            }
        },
        mounted () {
            this.labelPos = this.option.labelPos || 'right';
            if (this.option.labelWidth) {
                this.labelWidth = this.option.labelWidth + 'px'
            }
        },
        computed: {
        },
        components: {
            textComp,
            dateComp,
            selectComp,
            buttonComp
        },
        /* eslint-disable no-unused-vars */
        render (h) {
            let elItems;
            const me = this;
            const br = <br />;
            elItems = <el-form inline={this.option.inline} label-position={this.labelPos} label-width={this.labelWidth} ref='form' >
                {
                    me.option.items.map((it, index) => {
                        let comp;
                        const ref = 'comp' + index;
                        switch (it.type) {
                            case 'text':
                                comp = <textComp option={it.comOpt} ref={ref}></textComp>
                                break;
                            case 'date':
                                comp = <dateComp option={it.comOpt} ref={ref}></dateComp>
                                break;
                            case 'select':
                                comp = <selectComp option={it.comOpt} ref={ref}></selectComp>
                                break;
                            case 'button':
                                comp = <buttonComp option={it.comOpt} ref={ref}></buttonComp>
                                break;
                            default:break;
                        }
                        let formBox;
                        if (it.showCurrentForm === undefined || it.showCurrentForm) {
                            formBox = <el-form-item label={it.label}>
                                        {comp}
                                     </el-form-item>
                        }
                        if (it.wrap) {
                            return <span>{formBox} {br}</span>
                        }
                        return formBox
                    })
                }
            </el-form>
            return (
                <div class='yq-form'>
                    {elItems}
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

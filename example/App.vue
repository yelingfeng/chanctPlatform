<template>
    <div class="app" :style="styleObj" >
        <ChanctForm :option="formObj" ref="form"></ChanctForm>
    </div>
</template>
<script>
    export default {
       data(){
         let me = this;
         return {
            formObj:{
              // form 表单true横排，false竖排
              inline: true,
              canSlider: true,
              // 不写，默认right
              labelPos: 'right',
              labelWidth: '150',
              // 按钮位置，right 居右, 不写 默认紧跟
              btnPos: 'right',
              // 表单项
              items: [{
                label: '产品名称',
                type: 'text',
                comOpt: {
                  id: 'yq1',
                  width: 200,
                  value: 'hello',
                  disabled: true
                }
              }, {
                label: '产品名称',
                type: 'textNumber',
                wrap: true,
                comOpt: {
                  id: 'yq2',
                  value: 10,
                  width: 200,
                  disabled: false
                }
              }, {
                label: '产品名称',
                type: 'select',
                comOpt: {
                  id: 'yq3',
                  value: '2',
                  width: 200,
                  disabled: false,
                  data: [{
                    name: 'opt1', value: '1'
                  }, {
                    name: 'opt2', value: '2'
                  }],
                  change: function (val) {
                    let arr = []
                    if (val === '1') {
                      arr = [
                        { name: '西瓜', value: '1' }
                      ]
                    } else {
                      arr = [
                        { name: '苹果', value: '1' }
                      ]
                    }
                    me.$refs.form.setItemData('select222', arr)
                  }

                }
              },
                {
                  label: '测试级联下拉',
                  type: 'select',
                  comOpt: {
                    id: 'select222',
                    value: '2',
                    width: 200,
                    disabled: false,
                    data: me.selectArr2,
                    change: function () {
                    }

                  }
                },
                {
                  label: '产品列表',
                  type: 'select',
                  wrap: true,
                  comOpt: {
                    id: 'yq4',
                    value: ['1'],
                    width: 200,
                    disabled: false,
                    // 全部
                    isAll: true,
                    multiple: true,
                    data: [{
                      name: 'opt1', value: '1'
                    }, {
                      name: 'opt2', value: '2'
                    }],
                    change: function () {
                    }
                  }
                }, {
                  label: '年月日时分秒',
                  type: 'date',
                  comOpt: {
                    id: 'yq5',
                    value: '2017-5-24 10:00:00',
                    disabled: false,
                    width: 200,
                    type: 'datetime',
                    pickOptions: {
                      disabledDate (time) {
                        let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                        let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
                        return !moment(cTime).isBetween(pDate, cDate);
                      }
                    }
                  }
                }, {
                  label: '年月日',
                  type: 'date',
                  wrap: true,
                  comOpt: {
                    id: 'yq6',
                    value: '',
                    width: 200,
                    disabled: false,
                    type: 'date'
                  }
                }, {
                  label: '年月',
                  type: 'date',
                  comOpt: {
                    id: 'yq7',
                    value: '',
                    width: 200,
                    disabled: false,
                    type: 'month'
                  }
                }, {
                  label: '年',
                  type: 'date',
                  wrap: true,
                  comOpt: {
                    id: 'yq8',
                    value: '',
                    width: 200,
                    disabled: false,
                    type: 'year'
                  }
                }, {
                  label: '特殊资源',
                  type: 'radio',
                  comOpt: {
                    id: 'yq9',
                    value: '1',
                    disabled: false,
                    data: [{
                      name: 'opt1', value: '1'
                    }, {
                      name: 'opt2', value: '2'
                    }],
                    change: function () {
                    }
                  }
                }, {
                  label: '活动性质',
                  type: 'checkbox',
                  wrap: true,
                  comOpt: {
                    id: 'yq10',
                    value: ['1', '2'],
                    disabled: false,
                    data: [{
                      name: 'opt1', value: '1'
                    }, {
                      name: 'opt2', value: '2'
                    }, {
                      name: 'opt3', value: '3'
                    }, {
                      name: 'opt4', value: '4'
                    }],
                    change: function () {
                    }
                  }
                }, {
                  label: '即时配送',
                  type: 'switch',
                  comOpt: {
                    id: 'yq11',
                    value: true,
                    disabled: false,
                    text: '',
                    onText: '实时',
                    offText: '历史',
                    width: 100,
                    click: function (value) {
                      this.value = value;
                    }
                  }
                }, {
                  label: '',
                  type: 'button',
                  comOpt: {
                    // id: 'yq12',
                    value: '查询1',
                    disabled: false,
                    click: function () {
                      console.log(me.$refs.form.getValue());
                    }
                  }
                }, {
                  label: '',
                  type: 'button',
                  wrap: true,
                  comOpt: {
                    // id: 'yq12',
                    value: '查询2',
                    disabled: false,
                    click: function () {
                      console.log(me.$refs.form.getValue());
                    }
                  }
                },
                {
                  label: '关键词',
                  type: 'keyWord',
                  comOpt: {
                    width: 200,
                    id: 'keyWordx'
                  }
                }
              ],
              btns: [
                {
                  label: '',
                  type: 'button',
                  comOpt: {
                    // id: 'yq12',
                    value: '查询3',
                    disabled: false,
                    click: function () {
                      let h = me.$refs.form.getContainerHeight()
                      console.log(h)
                    }
                  }
                }
              ]
            }
         }
       },
       computed:{
         styleObj(){
           return {
             width : document.clientWidth +'px',
             height : '600px'
           }
         }
       }
    }
</script>
<style>
    @reset-global pc;
    .app{
        background: url('~assets/images/mainbg.png');
        background-repeat: repeat;
        background-size: cover;
        background-attachment: fixed;
    }
</style>
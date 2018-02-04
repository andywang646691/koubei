<template lang="pug">
div
  router-view.nested-view(v-show="nestedView")
  .use-time.fill-view.bg-gray(v-show="!nestedView")
    mt-cell(title="暂未添加使用时段" v-show="!useTimeViewArr.length")
    .cell-wrapper(v-for="(item, index) in useTimeViewArr" v-bind:class="{'top-item': index === 0}")
      mt-cell-swipe(
        v-bind:right="[ { content: '删除', style: { background: 'red', color: '#fff' }, handler: () => showDeleteBox(index) } ]"
      )
        .cell-text(slot="title")
          span  {{ item.title }}
          br
          span  {{ item.text }}
    .btn-list
      button.btn.btn-reverse.btn-other(v-on:click="$router.push({name: 'useTime.item'})")
        span  添加
      button.btn.btn-reverse.btn-other(v-on:click="$router.push({name: 'discount1.other'})")
        span 确定
</template>

<script>
import { MessageBox } from 'mint-ui'
import { mapState, mapActions } from 'vuex'

let weekDict = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export default {
  name: 'use-time',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'deleteUseTime'
    ]),
    showDeleteBox (id) {
      MessageBox.confirm('是否删除该条使用时段?').then(action => {
        this.deleteUseTime(id)
      })
    }
  },
  computed: {
    ...mapState({
      useTimeArr: state => state.useTimeItem.useTimeArr,
      useTimeViewArr: state => {
        return state.useTimeItem.useTimeArr.map((obj, index) => {
          let weeks = obj.values.split(',').map(val => weekDict[val - 1])
          return {
            title: `${weeks.join('，')}`,
            text: `${obj.times.replace(',', '-')} 可用`
          }
          // return `${weeks.join('，')} ${obj.times.replace(',', '-')} 可用`
        })
      }
    }),
    nestedView () {
      let viewName = this.$route.name.split('.').reverse()[0]
      return viewName === 'item'
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
  .cell-text {
    line-height: 1.6;
  }
</style>

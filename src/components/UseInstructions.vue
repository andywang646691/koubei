<template lang="pug">
  .use-instructions.fill-view.bg-gray
    mt-cell(title="暂未添加使用说明" v-show="!useInstructions.length")
    .cell-wrapper(v-for="(item, index) in useInstructions" v-bind:class="{'top-item': index === 0}")
      mt-cell-swipe(
      v-bind:right="[ { content: '删除', style: { background: 'red', color: '#fff' }, handler: () => showDeleteBox(index) } ]"
      )
        .cell-text(slot="title")
          span  {{ item }}
    .btn-list
      button.btn.btn-reverse.btn-other(v-on:click="addUseInstruction")
        span 添加
      button.btn.btn-reverse.btn-other(v-on:click="confirm")
        span 确定
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import { mapActions } from 'vuex'
export default {
  name: 'use-instructions',
  data () {
    return {
      useInstructions: this.$store.state.useInstructions.useInstructions.slice(0)
    }
  },
  methods: {
    ...mapActions('useInstructions', [
      'updateUseInstructions'
    ]),
    showDeleteBox (id) {
      MessageBox.confirm('是否删除该条使用说明?').then(action => {
        this.deleteUseInstruction(id)
      })
    },
    confirm () {
      this.updateUseInstructions(this.useInstructions)
      this.$router.push(this.parentRoute.path)
    },
    addUseInstruction () {
      MessageBox.prompt(' ', '添加使用说明').then(({ value, action }) => {
        if (this.useInstructions.length < 6) {
          this.useInstructions.push(value)
        } else {
          Toast('使用说明最多添加6条')
        }
      })
    },
    deleteUseInstruction (id) {
      this.useInstructions.splice(id, 1)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.parentRoute = from
    })
  },
  created () {
    document.title = '使用说明'
  }
}
</script>

<style lang="scss" scoped>
  .cell-text {
    line-height: 1.6;
  }
</style>

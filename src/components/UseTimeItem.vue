<template lang="pug">
  .usetime-item.fill-view.bg-gray
    .days
      p.days-title  可用日期
      ul.days-group
        li
          my-checkbox(
            label="周一"
            v-model="useTimeDayArr"
            value="1"
          )
        li
          my-checkbox(
            label="周二"
            v-model="useTimeDayArr"
            value="2"
          )
        li
          my-checkbox(
            label="周三"
            v-model="useTimeDayArr"
            value="3"
          )
        li
          my-checkbox(
            label="周四"
            v-model="useTimeDayArr"
            value="4"
          )
        li
          my-checkbox(
            label="周五"
            v-model="useTimeDayArr"
            value="5"
          )
        li
          my-checkbox(
            label="周六"
            v-model="useTimeDayArr"
            value="6"
          )
        li
          my-checkbox(
            label="周日"
            v-model="useTimeDayArr"
            value="7"
          )
    .cell-wrapper
      mt-cell(
        is-link
        title="每日可用开始时间"
        v-bind:value="startTime"
        v-on:click.native="openPicker('picker-start')"
      )
      mt-cell(
        is-link
        title="每日可用结束时间"
        v-bind:value="endTime"
        v-on:click.native="openPicker('picker-end')"
      )
    .btn-list
      button.btn.btn-reverse.btn-other(v-on:click="confirm")
        span  确定
    mt-datetime-picker(
      ref="picker-start"
      type="time"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-bind:value="pickerStartValue"
      v-on:confirm="pickerStartValue = arguments[0]"
    )
    mt-datetime-picker(
      ref="picker-end"
      type="time"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-bind:value="pickerEndValue"
      v-on:confirm="pickerEndValue = arguments[0]"
    )
</template>

<script>
import MyCheckbox from '@/components/MyCheckbox'
import { mapActions } from 'vuex'
export default {
  name: 'usetime-item',
  data () {
    return {
      pickerStartValue: '00:00',
      pickerEndValue: '23:59',
      useTimeDayArr: []
    }
  },
  computed: {
    useTimeDay () {
      return this.useTimeDayArr.slice(0).sort((a, b) => a - b)
    },
    startTime () {
      return `${this.pickerStartValue}:00`
    },
    endTime () {
      return `${this.pickerEndValue}:59`
    }
  },
  components: {
    MyCheckbox
  },
  methods: {
    ...mapActions('useTimeItem', [
      'updateUseTime'
    ]),
    openPicker (id) {
      this.$refs[id].open()
    },
    confirm () {
      if (this.useTimeDay.length > 0) {
        this.updateUseTime({
          dimension: 'W',
          times: `${this.startTime},${this.endTime}`,
          values: this.useTimeDay.join(',')
        })
      }
      this.$router.push(this.parentRoute.path)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.parentRoute = from
    })
  }
}
</script>

<style lang="scss" scoped>
  .days {
    padding: get-vw(25px) get-vw(47px);
    background: white;
  }
  .days-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .days-group > * {
    width: calc(25% - #{get-vw(38px)} * 2);
    margin: get-vw(18px) get-vw(38px);
    text-align: center;
  }
  button {

  }
</style>

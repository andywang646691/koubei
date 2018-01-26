<template lang="pug">
  label(class="mint-cell")
    mt-cell(
    :title="title"
    v-bind:value="indicator"
    is-link
    v-on:click.native="bindToFileElem"
    )
    form(v-show="false")
      input(
        type="file"
        accept="image/*"
        v-on:change="fileActionOnchange"
        id="input-file"
      )
</template>

<script>
import { Toast } from 'mint-ui'
import axios from 'axios'
import { uploadFile, getFileFromDom } from '@/services/utils.js'
export default {
  name: 'file-uploader',
  components: {
  },
  data () {
    return {
      domainInDownload: 'http://image.ipay.so',
      domainInUpload: 'http://up.qiniu.com',
      backend: '/neuStar/alp/photoUpload.json',
      token: '',
      qiniuUrl: ''
    }
  },
  props: {
    'clientId': {
      default: 'dev-test'
    },
    'uploaderName': {
      default: 'dev-test'
    },
    title: {
      default: '名称'
    }
  },
  computed: {
    indicator () {
      if (this.qiniuUrl) {
        return '请编辑'
      } else {
        return '请添加'
      }
    }
  },
  created () {
    this.getQiniuToken().then(token => {
      this.token = token
    })
  },
  methods: {
    bindToFileElem () {
      let fileElem = document.getElementById('input-file')
      fileElem.click()
    },
    fileActionOnchange (e) {
      let fileElem = e.target
      let fileData = getFileFromDom(fileElem)
      let form = new FormData()
      form.append('file', fileData.file)
      form.append('key', `${Date.now()}${this.clientId}.${fileData.type}`)
      form.append('token', this.token)
      let form2 = new FormData()
      form2.append('fileParameter', fileData.file)
      form2.append('clientId', this.clientId)
      uploadFile({
        fileElem,
        url: this.domainInUpload,
        data: form,
        uploaderName: this.uploaderName
      }).then(data => {
        let url = `${this.domainInDownload}/${data.key}`
        this.qiniuUrl = url
        Toast(`${this.uploaderName}上传成功`)
      })
      uploadFile({
        fileElem,
        url: this.backend,
        data: form2,
        uploaderName: this.uploaderName
      })
    },
    startUpload (e) {
      console.log(e)
    },
    getQiniuToken () {
      return axios({
        method: 'POST',
        url: '/neuStar/alp/getUpLoadToken.json?transFrom=ALP'
      }).then(res => {
        let data = res.data
        if (data.status === 0) {
          return data.data
        } else {
          Promise.reject(new Error('获取Token失败'))
        }
      }).catch(err => {
        Toast(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  label {
    display: block;
  }
</style>

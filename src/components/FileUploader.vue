<template lang="pug">
  label(class="mint-cell")
    mt-cell(
    :title="title"
    v-bind:value="indicator"
    is-link
    )
    input(
      type="file"
      accept="image/*"
      v-on:change="fileActionOnchange"
      id="input-file"
      size="1"
    )
</template>

<script>
import { Toast } from 'mint-ui'
import axios from 'axios'
import { uploadFile, getFileFromDom } from '@/services/helpers.js'
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
      qiniuUrl: '',
      imageId: ''
    }
  },
  props: {
    'clientId': {
      default: '150759774805270'
    },
    title: {
      default: '名称'
    },
    flag: {
      default: 'logo'
    }
  },
  computed: {
    indicator () {
      if (this.imageId) {
        return '请编辑'
      } else {
        return '请添加'
      }
    },
    uploaderName () {
      return this.title
    }
  },
  created () {
    this.getQiniuToken().then(token => {
      this.token = token
    })
  },
  methods: {
    uploadToQiniu ({ fileElem, form }) {
      return uploadFile({
        fileElem,
        url: this.domainInUpload,
        data: form,
        uploaderName: this.uploaderName
      }).then(data => {
        if (data.key) {
          let url = `${this.domainInDownload}/${data.key}`
          this.qiniuUrl = url
          this.$emit(`${this.flag}Url`, url)
        }
      })
    },
    uploadToBackend ({ fileElem, form }) {
      return uploadFile({
        fileElem,
        url: this.backend,
        data: form,
        uploaderName: this.uploaderName
      }).then(data => {
        if (data.status === 0) {
          this.imageId = data.data.imageId
          this.$emit(`${this.flag}Id`, data.data.imageId)
          Toast(`${this.uploaderName}上传成功`)
        }
      }).catch(() => {
        Toast(`${this.uploaderName}上传失败`)
        return Promise.reject(new Error('上传失败'))
      })
    },
    bindToFileElem () {
      let fileElem = document.getElementById('input-file')
      fileElem.click()
      console.log('load file')
    },
    fileActionOnchange (e) {
      let fileElem = e.target
      let fileData = getFileFromDom(fileElem)
      if (!fileData) return
      if (fileData.size > 2 * 1024 * 1024) {
        return Toast('上传的LOGO太大了')
      }
      if (!/(png)|(jpe?g)/.test(fileData.type)) {
        return Toast('仅允许png或jpg格式的图片')
      }
      let form = new FormData()
      form.append('file', fileData.file)
      form.append('key', `${Date.now()}${this.clientId}.${fileData.type}`)
      form.append('token', this.token)
      let form2 = new FormData()
      form2.append('fileParameter', fileData.file)
      form2.append('clientId', this.clientId)
      this.uploadToBackend({ fileElem, form: form2 }).then(() => {
        this.uploadToQiniu({ fileElem, form })
      })
    },
    startUpload (e) {
      console.log(e)
    },
    getQiniuToken () {
      return axios({
        method: 'POST',
        url: '/neuStar/alp/getUpLoadToken.json'
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
    position: relative;
  }
  .mint-cell input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>

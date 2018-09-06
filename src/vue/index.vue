<template>
  <div class="chat">
    <div class="chat-header" v-if="mergedConfig.showHeader">
      <slot name="header">
        {{mergedConfig.title}}
      </slot>
    </div>
    <scroll-view @scroll="scroll" :style="style" class="chat-content" :enable-back-to-top="true" :scroll-y="true" :scroll-into-view="lastId">
      <slot>
        <component :index="index" :id="'dialog_' + index" v-for="(message, index) in messageList" :key="index" :is="message.component || 'dialog-item'" :side="message.side" :data="message.data"></component>
      </slot>
    </scroll-view>
    <div class="chat-footer">
      <slot name="footer">
        <table>
          <tr>
            <td style="width: 100%;">
              <input class="chat-input" v-model="value" @focus="inputFocus" @keydown.enter="send" :placeholder="mergedConfig.placeholder" autocomplete="off" autofocus="on" />
            </td>
            <td><button @click="send" class="send-btn">发送</button></td>
          </tr>
        </table>
      </slot>
    </div>
  </div>
</template>

<script>
  import '../index.css'
  import dialogItem from './dialog-item.vue'
  const defaultConfig = {
    title: '聊天',
    placeholder: '你说，我听',
    showHeader: true
  }
  export default {
    props: {
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        value: '',
        messageList: [],
        lastId: ''
      }
    },
    methods: {
      onRecvMessage (msg, toBottom = true) {
        if (typeof msg === 'string') {
          msg = { data: msg }
        }
        this.messageList.push({ ...msg, side: 'left' })
        this.msgChange()
        toBottom && this.scrollToBottom()
      },
      onSendMessage (msg, toBottom = true) {
        if (typeof msg === 'string') {
          msg = { data: msg }
        }
        this.messageList.push({ ...msg, side: 'right' })
        this.msgChange()
        toBottom && this.scrollToBottom()
      },
      send () {
        if (!this.value) {
          return
        }
        this.$emit('send', this.value)
        this.value = ''
      },
      msgChange () {
        this.$emit('msgChange', this.messageList)
      },
      updateMessage (index, data) {
        if (!this.messageList[index]) {
          return
        }
        this.messageList[index].data = data
        this.msgChange()
        this.$forceUpdate()
      },
      setMessages (messageList) {
        this.messageList = messageList
        this.msgChange()
      },
      scrollToBottom (nextTick = true) {
        if (!nextTick) {
          this.lastId = `dialog_${this.messageList.length - 1}`
          return
        }
        this.$nextTick(() => {
          this.lastId = `dialog_${this.messageList.length - 1}`
        })
      },
      scrollTo (index, nextTick = true) {
        if (typeof index !== 'number' || !this.messageList[index]) {
          return
        }
        if (!nextTick) {
          this.lastId = `dialog_${index}`
          return
        }
        this.$nextTick(() => {
          this.lastId = `dialog_${index}`
        })
      },
      inputFocus () {
        this.scrollToBottom(false)
      },
      scroll () {
        console.log('scroll')

        this.lastId = ''
      }
    },
    computed: {
      style () {
        if (this.mergedConfig.showHeader) {
          return ''
        }
        return 'top: 0'
      },
      mergedConfig () {
        return Object.assign({}, defaultConfig, this.config)
      }
    },
    components: {
      'dialog-item': dialogItem
    }
  }
</script>

<template>
  <div class="chat">
    <div class="chat-header">
      <slot name="header">
        {{mergedConfig.title}}
      </slot>
    </div>
    <scroll-view class="chat-content" :scroll-y="true" :scroll-top="scrollTop" :scroll-into-view="`dialog_${messageList.length - 1}`">
      <component :id="`dialog_${index}`" v-for="(message, index) in messageList" :key="index" :is="message.component || 'dialog-item'" :side="message.side" :data="message.data"></component>
    </scroll-view>
    <div class="chat-footer">
      <slot name="footer">
        <table>
        <tr>
          <td style="width: 100%;">
            <input class="chat-input" v-model="value" @keydown.enter="send" :placeholder="mergedConfig.placeholder" autocomplete="off" autofocus="on" />
          </td>
          <td><button @click="send" class="send-btn">发送</button></td>
        </tr>
      </table>
      </slot>
    </div>
  </div>
</template>

<script>
import '../index.css';
import dialogItem from './dialog-item.vue';
const defaultConfig = {
  title: '聊天',
  placeholder: "你说，我听",
}
export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
  },
  data () {
    return {
      value: '',
      scrollTop: 0,
      messageList: [],
    };
  },
  methods: {
    onRecvMessage(msg) {
      if (typeof msg === 'string') {
        msg = {data: msg}
      }
      this.messageList.push({...msg, side: 'left'});
    },
    onSendMessage(msg) {
      if (typeof msg === 'string') {
        msg = {data: msg}
      }
      this.messageList.push({...msg, side: 'right'});
    },
    send() {
      if (!this.value) {
        return;
      }
      this.$emit('send', this.value);
      this.value = '';
    },
  },
  computed: {
    mergedConfig() {
      return Object.assign({}, defaultConfig, this.config);
    }
  },
  components: {
    dialogItem,
  }
}
</script>

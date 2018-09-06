<template>
  <div :class="['msg-item', side]">
    <div :class="['msg-item-content', 'triangle', side]">
      <slot>{{msg}}</slot>
    </div>
  </div>
</template>

<script>
  import escape from 'html-escape'
  export default {
    props: ['side', 'data', 'index'],
    computed: {
      msg () {
        return escape(this.data || '')
      }
    }
  }
</script>

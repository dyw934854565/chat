<template>
  <div :class="['msg-item', side]" :id="id">
    <div :class="['msg-item-content', 'triangle', side]">
      <slot>{{msg}}</slot>
    </div>
  </div>
</template>

<script>
  import escape from 'html-escape'
  export default {
    props: ['side', 'data', 'index', 'id'],
    computed: {
      msg () {
        return escape(this.data || '')
      }
    }
  }
</script>

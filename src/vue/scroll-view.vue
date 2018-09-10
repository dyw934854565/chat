<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['scroll-top', 'scroll-into-view'],
    created () {
      this.$watch('scrollIntoView', () => {
        if (!this['scrollIntoView']) {
          return
        }
        this.$nextTick(() => {
          const el = document.querySelector(`#${this['scrollIntoView']}`)
          el && el.scrollIntoView()
        })
      })
    },
    mounted () {
      document.querySelector('.chat-content').addEventListener('scroll', (e) => {
        this.$emit('scroll', e)
      })
    }
  }
</script>

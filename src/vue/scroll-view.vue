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
        console.log(this['scrollIntoView'])
        this.$nextTick(() => {
          document
            .querySelectorAll(`#${this['scrollIntoView']}`)[0]
            .scrollIntoView()
        })
      })
    }
  }
</script>

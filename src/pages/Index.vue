<template>
  <q-page class="flex column flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->

    <!-- Quasar Directives -->
    <div v-ripple>Click</div>
<!--    <div v-touch-pan="handler">...</div>-->
    <div v-ripple>Click</div>

    <!-- Quasar Components -->
    <q-btn @click="handleClickA" label="QBtn A" />
    <q-icon name="alarm" />

    <!-- Quasar Plugins -->
    <q-btn @click="$q.notify('QBtn B is Clicked.')" color="primary" label="Button B" />
    <q-btn @click="btnCClicked" color="primary" label="Button C" />

  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  beforeCreate() {
    console.log((`===>before create.`))
    const localData = {
      name: localStorage.getItem('user'),
      token: localStorage.getItem('token')
    }

    console.log('--->localData: ', localData)
  },
  methods: {
    handleClickA() {
      alert("Button A is Clicked.");
    },
    btnCClicked(){
      this.$q.notify('Button C clicked.')
    },
  }
};
</script>
<style lang="scss" scoped>
body {
  background-color: darkgrey;
}
</style>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title class="flex row justify-center items-center no-wrap">
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" /> -->
            <img src="https://res.cloudinary.com/imgcave/image/upload/v1592534979/Img/Logo/aurdes.png" alt="Logo"/>
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer class="bg-secondary text-grey-14">
      <q-toolbar>
        <q-toolbar-title class="text-italic text-weight-light flex row justify-center items-center no-wrap">
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar> -->
          life is short, do what you want.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
body.body--light {
  background: linear-gradient(-45deg, #9c7373, #b9a011, #7ebb7d, #5bc2c5, #1082df, #805bc5, #c15ece, #b44349);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
body.body--dark {
  background: linear-gradient(-45deg, #4d3838, #79680b, #4d724d, #3a7b7e, #0b5999, #4e3879, #6e3675, #632528);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>

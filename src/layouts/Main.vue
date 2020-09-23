<template>
  <q-layout view="hHh lpr fFf">

    <q-header reveal bordered id="header" class="bg-secondary">
      <q-toolbar>
        <q-toolbar-title class="full-width row no-wrap justify-between items-center content-start q-pa-sm">
          <q-btn color="primary" round @click="left = !left">
            <q-avatar size="36px">
              <img src="https://res.cloudinary.com/imgcave/image/upload/v1592534979/Img/Logo/aurdes.png" alt="logo">
            </q-avatar>
          </q-btn>
          <div>
            <q-btn dense flat round icon="admin_panel_settings" :class="userMenu.status.normal"
                   @click="right = !right"/>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          to="/home" exact>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://img.icons8.com/color/50/000000/home-page.png" alt="avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/project/hallofhero"
          exact>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://img.icons8.com/color/48/000000/image-gallery.png" alt="avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>Hall of Hero</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://img.icons8.com/color/48/000000/circled-play--v1.png" alt="avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>Hero Player</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://img.icons8.com/color/48/000000/overwatch.png" alt="avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>Hero Spider</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/project/booktransplan"
          exact>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://img.icons8.com/color/48/000000/informatics-book.png" alt="avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>Book Trans Plan</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://img.icons8.com/color/48/000000/book.png" alt="avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>Frontend Guidebook</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-drawer v-model="right" side="right" overlay bordered style="padding: 4px;margin: 4px;">
      <q-img class="absolute-top userImg"
             src="https://res.cloudinary.com/imgcave/image/upload/v1591580483/Img/Wallpaper/NIBJCC28091_kortyx.png"
             style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm" color="dark">
            <q-btn dense flat round icon="admin_panel_settings" style="color: #32cd79;" @click="right = !right"/>
          </q-avatar>
          <div class="text-weight-bold">{{ this.user }}</div>
          <div>@{{ this.token }}</div>
        </div>
      </q-img>


      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple :active="userMenu.active.info" @click="userMenuClicked('info')">
            <q-item-section avatar>
              <q-icon name="privacy_tip"/>
            </q-item-section>

            <q-item-section>
              Info
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :active="userMenu.active.star" @click="userMenuClicked('star')">
            <q-item-section avatar>
              <q-icon name="stars"/>
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :active="userMenu.active.post" @click="userMenuClicked('post')">
            <q-item-section avatar>
              <q-icon name="local_post_office"/>
            </q-item-section>

            <q-item-section>
              Post
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :active="userMenu.active.setting" @click="userMenuClicked('setting')">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>

            <q-item-section>
              Setting
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>


    </q-drawer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
      right: false,
      user: '',
      token: '',
      userMenu: {
        status: {
          normal: 'account-normal',
          info: 'account-info',
          warn: 'account-warn',
          error: 'account-error',
        },
        active: {
          info: false,
          star: false,
          post: false,
          setting: false,
        }
      }
    }
  },
  beforeCreate() {
  },
  beforeMount() {
    this.user = localStorage.getItem('user')
    this.token = localStorage.getItem('token')
  },
  methods: {
    userMenuClicked(inMenu) {
      for (let key in this.userMenu.active) {
        if (key !== inMenu) {
          this.userMenu.active[key] = false
        } else {
          this.userMenu.active[key] = !this.userMenu.active[key]
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.userImg {
  //filter: blur(1px);
  border-radius: 8px;
}
#rightsection {
  //border:1px solid lime;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.account-normal {
  color: $positive;
}
.account-info {
  color: $info;
}
.account-warn {
  color: $warning;
}
.account-error {
  color: $negative;
}
</style>

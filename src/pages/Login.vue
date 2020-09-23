<template>
  <q-page padding class="backgroundImgPixel" id="loginPage">
    <q-page-sticky position="top-left" :offset="[12, 12]">
      <!--      <q-btn fab icon="add" color="accent" />-->

      <q-fab
        class="“q-btn–fab-mini”"
        color=""
        flat
        :icon="media.music.play === true ? 'audiotrack' : 'music_off'"
        direction="right"
      >
        <q-fab-action
          color=""
          @click="music('switchPlay')"
          :icon="media.music.play === true ? 'music_off' : 'play_arrow'"
        />
        <q-fab-action color="" @click="music('switchPlay')" icon="shuffle" />
      </q-fab>
      <audio autoplay id="backgroundMusic" :src="media.music.url" />
    </q-page-sticky>
    <q-card class="loginCard">
      <q-card-section>
        <q-form @submit="submit" @reset="reset" class="q-gutter-md">
          <q-input
            filled
            v-model="login.data.name"
            label="Name"
            hint=""
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please inter your name !'
            ]"
            :dense="login.state.dense"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            filled
            v-model="login.data.password"
            label="Password"
            hint=""
            :rules="[
              val => (val && val.length > 0) || 'Please inter your password !'
            ]"
            :type="login.state.password ? 'password' : 'text'"
            :dense="login.state.dense"
          >
            <template v-slot:prepend>
              <q-icon name="vpn_key" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="login.state.password ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="login.state.password = !login.state.password"
              />
            </template>
          </q-input>

          <div>
            <q-btn
              label="Login"
              type="submit"
              color="primary"
              :loading="login.state.submitting"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { userLogin } from "src/services/login";

export default {
  // name: 'PageName',
  data: function() {
    return {
      login: {
        state: {
          dense: true,
          password: true,
          submitting: false
        },
        data: {
          name: "",
          password: ""
        },
        defaultData: {
          name: "",
          password: ""
        }
      },
      media: {
        music: {
          play: false,
          url:
            "https://res.cloudinary.com/imgcave/video/upload/v1598879151/Music/Test/WithYouForever_sx8wxx.mp3",
          buttonSize: "xs"
        }
      }
    };
  },
  mounted: function() {},
  methods: {
    submit() {
      this.login.state.submitting = true;

      const loginObject = {
        name: this.login.data.name,
        password: this.login.data.password
      };
      console.log("--->loginObject: ", loginObject);

      userLogin(loginObject)
        .then(responseData => {
          localStorage.setItem("user", responseData.data.name);
          localStorage.setItem("token", responseData.data.token);

          this.login.state.submitting = false;
          // this.$router.replace({ name: 'home', params: {} })
          this.$router.replace({ name: "Home", params: {} });
        })
        .catch(error => {
          this.login.state.submitting = false;
          alert(`Error: Name or Password wrong.`);
        });

      // setTimeout(() => {
      //   this.login.state.submitting = false;
      // }, 3000);

      // alert(`Name: ${this.login.data.name} | Password: ${this.login.data.password}`);
    },
    reset() {
      this.login.data = JSON.parse(JSON.stringify(this.login.defaultData));

      // alert(`Name: ${this.login.data.name} | Password: ${this.login.data.password}`);
    },
    music(command) {
      let music = document.getElementById("backgroundMusic");

      switch (command) {
        case "switchPlay":
          if (this.media.music.play) {
            music.pause();
          } else {
            music.play();
          }
          this.media.music.play = !this.media.music.play;
          break;
        case "stop":
          break;
        default:
      }
    }
  }
};
</script>

<style lang="scss">
body {
  overflow: hidden;
}
#loginPage {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.q-card {
  width: 80%;
  min-width: 500px;
  max-width: 600px;
  height: 50%;
  padding: 4px;

  border: 1px solid rgba(255, 255, 255, 0.8);
  background-color: transparent;
  box-shadow: 0 0 128px 80px rgba(255, 255, 255, 0.6) inset,
    0 0 16px 1px rgba(255, 255, 255, 1);
}

.q-card--dark {
  border: 1px solid rgba(0, 0, 0, 0.8);
  background-color: transparent;
  box-shadow: 0 0 128px 80px rgba(0, 0, 0, 0.6) inset, 0 0 16px 1px rgb(0, 0, 0);
}
</style>

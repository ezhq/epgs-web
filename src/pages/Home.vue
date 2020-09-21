<template>
  <!--  <q-page padding class="backgroundImgPixel" id="loginPage">-->
  <!--    <div>Hola</div>-->
  <!--  </q-page>-->

  <div class="q-pa-md">
        <q-carousel
          swipeable
          animated
          arrows
          v-model="slide"
          :fullscreen.sync="fullscreen"
          infinite
          :autoplay=10000
          style="border-radius: 10px;margin: 0 auto;min-height: 600px;"
        >
          <q-carousel-slide :name="1"
                            img-src="https://res.cloudinary.com/imgcave/image/upload/v1591580479/Img/Wallpaper/NIBJXS26281_ogb221.png"/>
          <q-carousel-slide :name="2"
                            img-src="https://res.cloudinary.com/imgcave/image/upload/v1591580483/Img/Wallpaper/NIBJCC28091_kortyx.png"/>
          <q-carousel-slide :name="3"
                            img-src="https://res.cloudinary.com/imgcave/image/upload/v1591580487/Img/Wallpaper/NIBJYHY33261_iv6qdl.png"/>
          <q-carousel-slide :name="4"
                            img-src="https://res.cloudinary.com/imgcave/image/upload/v1591580492/Img/Wallpaper/BJAP35311_takx1g.png"/>
          <q-carousel-slide :name="5"
                            img-src="https://res.cloudinary.com/imgcave/image/upload/v1591580497/Img/Wallpaper/BJJS38392_huilzy.png"/>
          <q-carousel-slide :name="6"
                            img-src="https://res.cloudinary.com/imgcave/image/upload/v1591580568/Img/Wallpaper/BJCC42067_dag9yl.png"/>
          <q-carousel-slide :name="7"
                            img-src="https://res.cloudinary.com/imgcave/image/upload/v1591580494/Img/Wallpaper/BJJS37245_q2n1vb.png"/>


          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
              <q-btn
                push round dense color="dark" text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              />
            </q-carousel-control>
          </template>
        </q-carousel>

<!--    <div style="width: 100%;height: 100%;">-->
<!--      <div class="title-bar row items-center overflow-hidden">-->
<!--        <q-btn flat color="white" icon="fas fa-chevron-left" class="direction-button" style="height: 100%"-->
<!--               @click="onPrev"/>-->
<!--        <transition :name="transition" appear>-->
<!--          <div :key="parsedStart.date" class="row justify-between items-center text-white overflow-hidden"-->
<!--               style="width: calc(100% - 112px)">-->
<!--            <div v-for="day in days" :key="day.date" class="col-auto" :style="dayStyle">-->
<!--              <q-btn flat :class="dayClass(day)" style="line-height: unset;"-->
<!--                     @click="selectedDate = day.date; transition = ''">-->
<!--                <div class="text-center" style="width: 100%;">{{ monthFormatter(day, true) }}</div>-->
<!--                <div class="text-center text-bold" style="width: 100%;  font-size: 16px;">{{-->
<!--                    dayFormatter(day, false)-->
<!--                  }}-->
<!--                </div>-->
<!--                <div class="text-center" style="width: 100%; font-size: 10px;">{{ weekdayFormatter(day, true) }}</div>-->
<!--              </q-btn>-->
<!--            </div>-->
<!--          </div>-->
<!--        </transition>-->
<!--        <q-btn flat color="white" icon="fas fa-chevron-right" class="direction-button" style="height: 100%"-->
<!--               @click="onNext"/>-->
<!--      </div>-->
<!--      <q-calendar-->
<!--        v-model="selectedDate"-->
<!--        view="day"-->
<!--        hide-header-->
<!--        bordered-->
<!--        hour24-format-->
<!--        dark-->
<!--        :interval-height="50"-->
<!--        locale="en-us"-->
<!--        style="height: 100%; border-top: none;"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>
<script>
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'

const CURRENT_DAY = new Date()

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = QCalendar.parseDate(newDay)
  return tm.date
}

export default {
  // name: 'PageName',
  data: function () {
    return {
      slide: 1,
      fullscreen: false,
      selectedDate: getCurrentDay(CURRENT_DAY.getDate()),
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      locale: 'en-us',
      monthFormatter: this.monthFormatterFunc(),
      dayFormatter: this.dayFormatterFunc(),
      weekdayFormatter: this.weekdayFormatterFunc(),
      transitionPrev: 'slide-right',
      transitionNext: 'slide-left',
      transition: ''
    };
  },
  computed: {
    weekdaySkips() {
      return QCalendar.getWeekdaySkips(this.weekdays)
    },

    parsedStart() {
      if (this.selectedDate) {
        return QCalendar.getStartOfWeek(QCalendar.parseTimestamp(this.selectedDate), this.weekdays, this.today)
      }
      return void 0
    },

    parsedEnd() {
      if (this.selectedDate) {
        return QCalendar.getEndOfWeek(QCalendar.parseTimestamp(this.selectedDate), this.weekdays, this.today)
      }
      return void 0
    },

    today() {
      const newDay = new Date(CURRENT_DAY)
      const tm = QCalendar.parseDate(newDay)
      return tm
    },

    days() {
      if (this.parsedStart && this.parsedEnd) {
        return QCalendar.createDayList(
          this.parsedStart,
          this.parsedEnd,
          this.today,
          this.weekdaySkips
        )
      }
      return []
    },

    dayStyle() {
      return {
        width: 100 / this.weekdays.length + '%'
      }
    }
  },

  methods: {
    onPrev() {
      const ts = QCalendar.addToDate(this.parsedStart, { day: -7 })
      this.selectedDate = ts.date
      this.transition = 'q-transition--' + this.transitionPrev
    },

    onNext() {
      const ts = QCalendar.addToDate(this.parsedStart, { day: 7 })
      this.selectedDate = ts.date
      this.transition = 'q-transition--' + this.transitionNext
    },

    dayClass(day) {
      return {
        row: true,
        'justify-center': true,
        'selected-date': this.selectedDate === day.date
      }
    },

    monthFormatterFunc() {
      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    weekdayFormatterFunc() {
      const longOptions = { timeZone: 'UTC', weekday: 'long' }
      const shortOptions = { timeZone: 'UTC', weekday: 'short' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    dayFormatterFunc() {
      const longOptions = { timeZone: 'UTC', day: '2-digit' }
      const shortOptions = { timeZone: 'UTC', day: 'numeric' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    }
  }
};
</script>

<style lang="scss">
body {
  //background-color: $accent;
}

</style>
<style lang="sass" scoped>
.title-bar
  width: 100%
  height: 70px
  background: #9c27b0
  display: flex
  flex-direction: row
  flex: 1

.direction-button
  background: #9c27b0
  color: white
  z-index: 20

.selected-date
  color: #9c27b0
  background: white
</style>

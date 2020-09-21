/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import lang from 'quasar/lang/en-us'

import iconSet from 'quasar/icon-set/material-icons'


import Vue from 'vue'

import {Quasar,QBtn,QIcon,QForm,QInput,QCard,QCardSection,QCardActions,QSpinner,QSpinnerFacebook,Ripple,TouchPan,TouchSwipe,Notify,BottomSheet} from 'quasar'


Vue.use(Quasar, { config: {"brand":{"primary":"#00a352","secondary":"#282c34","accent":"#00d66c","dark":"#000000","positive":"#00d66c","negative":"#f50000","info":"#f5f500","warning":"#ff8000"},"dark":false},lang: lang,iconSet: iconSet,components: {QBtn,QIcon,QForm,QInput,QCard,QCardSection,QCardActions,QSpinner,QSpinnerFacebook},directives: {Ripple,TouchPan,TouchSwipe},plugins: {Notify,BottomSheet} })

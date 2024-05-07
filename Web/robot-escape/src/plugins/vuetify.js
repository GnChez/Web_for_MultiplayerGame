/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiMenu, mdiCheckCircleOutline, mdiCloseCircleOutline, mdiCached, mdiPlus, mdiMinus, mdiEye, mdiEyeOff, mdiArrowLeft, mdiArrowRight, mdiMagnify, mdiAlertOctagramOutline, mdiGoogle, mdiAlertCircleOutline,mdiDownload  } from '@mdi/js'

const customPageStyle = {
  dark: false,
  colors: {
    background: '#393E46',
    surface: '#F8B500',
    'surface-bright': '#F8B500',
    'surface-light': '#EEEEEE',
    'surface-variant': '#F8B500',
    'on-surface-variant': '#EEEEEE',
    primary: '#222831',
    'primary-darken-1': '#1F5592',
    secondary: '#393E46',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }

}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      customPageStyle,
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      eye: mdiEye,
      eyeOff: mdiEyeOff,
      minus: mdiMinus,
      plus: mdiPlus,
      check: mdiCheckCircleOutline,
      close: mdiCloseCircleOutline,
      refresh: mdiCached,
      arrowLeft: mdiArrowLeft,
      arrowRight: mdiArrowRight,
      magnify: mdiMagnify,
      alertOctogram: mdiAlertOctagramOutline,
      google : mdiGoogle,
      alert: mdiAlertCircleOutline,
      descargar: mdiDownload,
      menu: mdiMenu
    },
    sets: {
      mdi,
    }
  }
})

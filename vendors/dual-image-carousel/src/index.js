// Style
import './scss/index.scss'

// JS
import App from './js/App'

import $ from 'jquery'

$(function() {
  new App({
    prevBtn: $('.prev'),
    nextBtn: $('.next')
  })
})
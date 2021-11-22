//Stylesheets
import './styles/base.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/resets.scss'

//JavaScript
import './js/app.js'
import './js/countdown.js'
import './js/lists.js'

//Functions, events
import { performAction } from './js/app.js'
import { countdown, countdownConditions, wCountdown, tripLength } from './js/countdown.js'
import { hotelInfo } from './js/lists.js'



export { performAction, countdown, countdownConditions, wCountdown, tripLength, hotelInfo }
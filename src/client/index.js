//Stylesheets
import './styles/base.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/resets.scss'
import './styles/extraInfo.scss'

//JavaScript
import './js/app.js'
import './js/countdown.js'
import './js/lists.js'
import './js/localStorage.js'
import './js/saveTrip.js'
import './js/tests.js'

//Functions, events
import { performAction } from './js/app.js'
import { countdown, countdownConditions, wCountdown, tripLength } from './js/countdown.js'
import { hotelInfo, newElement } from './js/lists.js'
import { itemsArray, data } from './js/localStorage.js'
import { saveTrip } from './js/saveTrip.js'
import { countdownTest } from './js/tests.js'

export { performAction, countdown, countdownConditions, wCountdown, tripLength, hotelInfo, newElement, itemsArray, data, saveTrip, countdownTest }
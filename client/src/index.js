import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import App from './components/App'

import { render } from 'react-dom'
import { initializeFirebase } from './components/PushNotifications/firebase'

render(<App />, document.getElementById('root'))
//TODO possibly place in configure store
initializeFirebase()

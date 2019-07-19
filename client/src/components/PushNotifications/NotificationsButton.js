import React from 'react' 
import { Button } from 'reactstrap'

const NotificationsButton = ({ activateNotifications }) => (
    <Button onClick={activateNotifications}> Activate Notifications </Button>
)

export default NotificationsButton
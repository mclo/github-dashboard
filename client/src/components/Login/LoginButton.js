import React from 'react'
import { NavLink, Button } from 'reactstrap'

const LoginButton = ( props ) => {
    return (
        <Button onClick={props.onClick}>
        Github Login
        </Button>
)
}

export default LoginButton
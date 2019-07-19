import React from 'react'
import { NavItem } from 'reactstrap'

const LogoutButton = ( props ) =>  {
return <NavItem onClick={props.logOut}>log out</NavItem>
}

export default LogoutButton
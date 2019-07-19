import React from 'react'
import { Badge as StrapBadge } from 'reactstrap'

const Badge = ({amount}) => {
    let style = getStyle();

    return <StrapBadge style={style}>{amount}</StrapBadge> 
}

const getStyle = () => {
    return {
        backgroundColor: "red",
        margin: 3
    }
}

export default Badge;
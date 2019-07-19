import React from 'react'
import { Media } from 'reactstrap'

const UserImage = ({image}) => {
    let style = getStyle();
    
    return (<Media>
          <Media
            object
            src={image}
            style={style}
            alt={"user profile image"}
          />
        </Media>)
}

const getStyle = () => {
    return {
        maxHeight: 64,
        maxWidth: 64,
        margin: 10,
        borderRadius: 7
      };
}

export default UserImage
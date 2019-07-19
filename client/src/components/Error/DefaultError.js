import React from 'react';

const DefaultError = ({code}) => {
    return <div>  
        <h3>{code}</h3>
        <h6>something went wrong</h6>
        </div>
}

export default DefaultError;
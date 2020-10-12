import React from 'react';

const Status = (props) => {

    const state = props.state;

    const display = () => {
        let status = '';
        status += state.touched ? 'T' : 't';
        status += state.dirty ? 'D' : 'd';
        status += state.valid ? 'V' : 'v';
        return status;
    }

    return (
        <span className="control-status"> {display()}</span>
    )
}

export default Status;

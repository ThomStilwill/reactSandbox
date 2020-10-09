import React from 'react';
import Button from '../shared/button';

const Form = ({children, ...props}) => {

    const handleSubmit = event => {
        event.preventDefault();
        //alert(JSON.stringify(props.state, null, 2));
        props.onSubmit(props.state);
    }

    const handleCancel = event => {
        props.onCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{props.title}</h2>
            <br/>

            <div className="form">
                {children}
            </div>

            <div className="button-bar">
                    <Button type="reset"
                            label="Cancel"
                            onClick={handleCancel}/>
                    <Button type="submit" 
                            label="Submit"
                            />
            </div>
        </form>
    )
};

export default Form;

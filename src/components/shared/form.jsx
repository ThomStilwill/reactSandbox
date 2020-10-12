import React from 'react';
import Button from '../shared/button';

const Form = ({children, ...props}) => {

    const handleSubmit = event => {
        event.preventDefault();
        const dump = JSON.stringify(props.state, null, 2);
        console.log(dump);
        props.onSubmit(props.state);
    }

    const handleCancel = event => {
        props.onCancel();
    }

    // const handleStateChange = event => {
    //     console.log(JSON.stringify(event));
    // };

    const hasErrors = () => {
        return Object.keys(props.formState.errors).length>0;
    }

    return (
        <form onSubmit={handleSubmit}>
            
            <div className="form-title">
                <h2>{props.title}</h2>
            </div>
            
            { hasErrors() && 
                <div className="validation-banner" >Please fix the errors and try again.
                </div> 
            }

            <div className="form">
                {children}
            </div>

            <div className="button-bar">
                    <Button type="reset"
                            label="Cancel"
                            onClick={handleCancel}/>
                    <Button type="submit" 
                            label="Submit"
                            disabled={hasErrors()}
                            />
            </div>
            <pre>{JSON.stringify(props.state)}</pre>
            <pre>{JSON.stringify(props.formState)}</pre>
        </form>
    )
};

export default Form;

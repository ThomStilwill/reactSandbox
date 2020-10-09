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

    return (
        <form onSubmit={handleSubmit}>
            
            <div class="form-title">
                <h2>{props.title}</h2>
            </div>
            
            { Object.keys(props.errors).length>0 && 
                <div class="validation-banner" >Please fix the errors and try again.
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
                            />
            </div>
        </form>
    )
};

export default Form;

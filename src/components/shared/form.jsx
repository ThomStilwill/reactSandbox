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

    const hasErrors = () => {
        let result = false;

        props.formState.fields.map(field=>{
            if(field.errors && field.errors.length>0){
                result = true;
                
            }
            return true;
        })
        return result;
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
            <pre>{JSON.stringify(props.formState,null,2)}</pre>
        </form>
    )
};

export default Form;

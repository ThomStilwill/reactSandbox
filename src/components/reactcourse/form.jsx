import React  from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {createYupSchema} from './form-builder';
import {formData} from './formdata';

const Input = props => {
    const formik = props.formik;
    return (
        <label>
            <span className="label-text">{props.label}</span>
            <div className="input-block">
                <input 
                    id={props.id}
                    name={props.id}
                    type='text'
                    {...formik.getFieldProps(props.id)}
                />
                <div className="error-block">
                    {formik.touched[props.id] && formik.errors[props.id]  
                    ? <div>{formik.errors[props.id]}</div> 
                    : ""}
                </div>
            </div>
        </label>
    )
}

const SignupForm = () => { 

    const yepSchema = formData.reduce(createYupSchema, {});
    const validateSchema = Yup.object().shape(yepSchema);

    const initialValues = {};
    formData.forEach(item => {
      initialValues[item.id] = item.value || "";
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

      return (
        <form onSubmit={formik.handleSubmit}>
            <Input id='firstName' label='First Name' formik={formik}/>
            <Input id='lastName' label='Last Name' formik={formik}/>
            <Input id='email' label='Email' formik={formik}/>
            <button type='submit' enabled={formik.errors}>Save</button>
        </form>
      )
}

class Form extends React.Component {
    render(){
        return (
            <div className="react-form">
                <SignupForm/>
            </div>
        )
    }
}

export default Form;

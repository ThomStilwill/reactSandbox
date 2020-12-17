import React  from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createYupSchema} from './form-builder';
import { formData } from './formdata';
import { find } from '../../helpers/utils';

const Input = props => {
    const formik = props.formik;
    const data = find(x=>x.id===props.id,props.data);
    return (
        <label>
            <span className="label-text">{data.label}</span>
            <div className="input-block">
                <input 
                    id={data.id}
                    name={data.id}
                    type='text'
                    {...formik.getFieldProps(data.id)}
                />
                <div className="error-block">
                    {formik.touched[data.id] && formik.errors[data.id]  
                    ? <div>{formik.errors[data.id]}</div> 
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
            
            <Input id='firstName' data={formData} formik={formik}/>
            <Input id='lastName' data={formData} formik={formik}/>
            <Input id='email' data={formData} formik={formik}/>
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

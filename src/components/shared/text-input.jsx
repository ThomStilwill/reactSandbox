import React from 'react';
import PropTypes from 'prop-types';
import Status from './status';

class TextInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state =   {
        name:'',
        type:'',
        placeholder:'',
        onChange:'',
        onStateChange: '',
        className:'',
        children:'',
        label:'',
        value: '',
        formState: {
        touched: false,
        dirty: false,
        valid: false,
        name: '',
        errors:[],
        },
        validators:[],
        ...props
      } 
      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.handleStateChange = this.handleStateChange.bind(this);
    }

    componentDidMount(){
      const formState = this.state.formState;
      formState.name = this.state.name;
      this.setState({formState});
    }

    componentDidUpdate( prevProps,  prevState){
      //console.log(JSON.stringify(prevProps));
      //this.validate(this.state.value);
    }

    handleStateChange = event => {
      const formState = this.state.formState;
      formState.name = this.state.name;
      this.state.onStateChange(formState);
    }

    handleChange = event => {

      const formState = this.state.formState;
      formState.dirty = true;
      this.setState({formState: formState});

      this.setState({value: event.target.value });
      this.state.onChange(event);
      this.state.onStateChange(this.state.formState);
      console.log(`onChange: ${this.state.name} :: ${event.target.value}` );
    }

    handleBlur = event => {
      const formState = this.state.formState;
      formState.touched = true;
      this.setState({formState: formState});

      const value = event.target.value;
      this.validate(value);
    }

    validate = (value) => {
      const errors = [];
      this.state.validators.some(validator => {
        if(!validator.test(value)) {
          errors.push(`${validator.message}`);
          return validator.break;
        }   
        return false;
      });

      const formState = this.state.formState;
      formState.errors = errors;
      formState.valid = errors.length === 0;
     
      this.setState({formState: formState});
      this.state.onStateChange(this.state.formState);
    }

    hasErrors = () => {
      return Object.keys(this.state.formState.errors).length > 0;
    }

    render() { 

    const { value } = this.props;

    return (
      <>
        <div className="field">
            <label htmlFor={this.state.name}>
                <div className="labeltext" >{this.state.label}</div>
                <div className="inputblock">
                    <div className="text inputcontrol">
                        <input
                            id={this.state.name}
                            name={this.state.name}
                            type={this.state.type}
                            placeholder={this.state.placeholder}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            value={value}
                            className={this.state.className}
                            style={this.hasErrors() ? {border: 'solid 1px red'} : {}}
                            />
                            <Status state={this.state.formState} />
                    </div>
                    <div className="validation-messages">
                        <div>
                            { 
                              this.state.formState.errors &&
                              this.state.formState.errors.map(error=><p>{error}</p>) }
                        </div>
                    </div>
                </div>
            </label>
        </div>
      </>
    )
    }
}

TextInput.defaultProps = {
  type: "text",
  className: ""
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
}

export default TextInput;
  
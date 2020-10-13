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
        fieldState: {
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
      const fieldState = this.state.fieldState;
      fieldState.name = this.state.name;
      this.setState({fieldState});
    }

    componentDidUpdate( prevProps,  prevState){
      //console.log(JSON.stringify(prevProps));
      //this.validate(this.state.value);
    }

    handleStateChange = event => {
      const fieldState = this.state.fieldState;
      fieldState.name = this.state.name;
      this.state.onStateChange(fieldState);
    }

    handleChange = event => {

      const fieldState = this.state.fieldState;
      fieldState.dirty = true;
      this.setState({fieldState: fieldState});

      this.setState({value: event.target.value });
      this.state.onChange(event);
      this.state.onStateChange(this.state.fieldState);
      console.log(`onChange: ${this.state.name} :: ${event.target.value}` );
    }

    handleBlur = event => {
      const fieldState = this.state.fieldState;
      fieldState.touched = true;
      this.setState({fieldState: fieldState});

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

      const fieldState = this.state.fieldState;
      fieldState.errors = errors;
      fieldState.valid = errors.length === 0;
     
      this.setState({fieldState: fieldState});
      this.state.onStateChange(this.state.fieldState);
    }

    hasErrors = () => {
      return Object.keys(this.state.fieldState.errors).length > 0;
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
                            <Status state={this.state.fieldState} />
                    </div>
                    <div className="validation-messages">
                        <div>
                            { 
                              this.state.fieldState.errors &&
                              this.state.fieldState.errors.map(error=><p>{error}</p>) }
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
  
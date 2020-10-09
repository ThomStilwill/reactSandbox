import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state =   {
        name:'',
        type:'',
        placeholder:'',
        onChange:'',
        onError: '',
        className:'',
        errors:[],
        children:'',
        label:'',
        value: '',
        validators:[],
        ...props
      } 
      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange = event => {
      this.setState({ value: event.target.value })
      this.state.onChange(event);
    }

    handleError = event => {

      this.state.onError(event);
    }


    handleBlur = event => {
      const errors = [];
      const value = event.target.value;

      this.state.validators.some(validator => {
        //console.log(validator);
        if(!validator.test(value)) {
          //console.log(`${this.state.name} = ${validator.message}`);
          errors.push(`${validator.message}`);
          return validator.break;
        }   
        return false;
      });
      this.setState({errors: errors});

      if(errors.length>0){
        this.state.onError({name:this.state.name, count: errors.length});
      }
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
                            style={this.state.error && {border: 'solid 1px red'}}
                            />
                    </div>
                    <div className="validation-messages">
                        <div>
                            { this.state.errors && this.state.errors.map(error=><p>{error}</p>) }
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
  
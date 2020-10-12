import React from 'react';

const Button = (props) => (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  )

  export default Button;
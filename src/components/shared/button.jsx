import React from 'react';

const Button = (props) => (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )

  export default Button;
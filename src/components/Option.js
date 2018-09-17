import React from 'react';

const Option = (props) => (
  <div>
    <li>
      {props.optionText}
      <button
        className="button button--link"
        onClick={() => props.handleRemoveOption(props.optionText)}
      >
        Remove
      </button>
    </li>
  </div>
);

export default Option;

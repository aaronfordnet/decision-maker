import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button
        className="button button--link"
        onClick={props.handleRemoveAll}
      >
        Remove All
      </button>
    </div>
    {props.optionsList.length === 0 && <p>Please enter some options</p>}
    <ul>
      {
        props.optionsList.map(opt => (
          <Option
            key={opt}
            optionText={opt}
            handleRemoveOption={props.handleRemoveOption}
          />
        ))
      }
    </ul>
  </div>
);

export default Options;

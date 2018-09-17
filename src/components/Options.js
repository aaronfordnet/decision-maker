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
    {
      props.optionsList.length === 0 &&
      <p className="widget__message">
        Please enter some options
      </p>
    }
    {
      props.optionsList.map((option, index) => (
        <Option
          key={option}
          optionText={option}
          count={index + 1}
          handleRemoveOption={props.handleRemoveOption}
        />
      ))
    }
  </div>
);

export default Options;

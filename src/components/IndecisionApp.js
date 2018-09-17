import React from 'react';
import Header from './Header';
import Options from './Options';
import AddOption from './AddOption';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  handleRemoveAll = () => {
    this.setState(() => ({ options: [] }));
  }
  handleRemoveOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((opt) => opt !== option)
    }));
  }
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter a valid option'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already exists'
    }
    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  }
  handleMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const choice = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: choice }));
  }
  handleCloseModal = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }
  componentDidMount() {
    try {
      const options = JSON.parse(localStorage.getItem('options'));
      options && this.setState(() => ({ options }));
    } catch (e) {
      console.log(e);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container main-content">
          <Action
            hasOptions={this.state.options.length > 0}
            handleMakeDecision={this.handleMakeDecision}
          />
          <div className="widget">
            <Options
              optionsList={this.state.options}
              handleRemoveAll={this.handleRemoveAll}
              handleRemoveOption={this.handleRemoveOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  };
}

// IndecisionApp.defaultProps = {
//   options: []
// };

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleMakeDecision = this.handleMakeDecision.bind(this);
    this.state = {
      subtitle: 'Put your life in the hands of a computer',
      options: props.options
    };
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
  handleRemoveAll() {
    this.setState(() => ({ options: [] }));
  }
  handleRemoveOption(option) {
    this.setState((prevState) => ({
      options: prevState.options.filter((opt) => opt !== option)
    }));
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter a valid option'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already exists'
    }
    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  }
  handleMakeDecision() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const choice = this.state.options[randomNum];
    this.setState(() => ({ options: [choice] }));
  }
  render() {
    return (
      <div>
        <Header
          subtitle={this.state.subtitle}
        />
        <Action
          hasOptions={this.state.options.length > 0}
          handleMakeDecision={this.handleMakeDecision}
        />
        <Options
          optionsList={this.state.options}
          handleRemoveAll={this.handleRemoveAll}
          handleRemoveOption={this.handleRemoveOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  };
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

const Action = (props) => {
  return (
    <button onClick={props.handleMakeDecision} disabled={!props.hasOptions}>
      What should I do?
    </button>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      {props.optionsList.length === 0 && <p>Please enter some options</p>}
      <ul>
        {
          props.optionsList.map(opt => (
            <Option key={opt}
                    optionText={opt}
                    handleRemoveOption={props.handleRemoveOption}
            />
          ))
        }
      </ul>
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      <li>
        {props.optionText}
        <button onClick={() => props.handleRemoveOption(props.optionText)}>
          X
        </button>
      </li>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return { error };
    });

    e.target.elements.option.value = '';
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name='option' />
          <button>Add Option</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

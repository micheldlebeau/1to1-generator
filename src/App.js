import React from 'react';
import './App.css';


function Questions(props){
  return(
    <div className="Questions">
      <h2>Category: {props.category}</h2>
      <ul>
        {
          props.questions.map((question, key) => (
          <li key={"li"+key+question.id+props.category }><input type="checkbox" id={question.id}/> <label htmlFor={question.id}>{question.question}</label></li>
        ))}
      </ul>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [], categories: [], view: 'Conversation starters'};
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/micheldlebeau/1on1-questions/master/questions.json`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ data: json });

      var categories = []
      json.forEach(element => {
        if(categories.indexOf(element.category) === -1) {
          categories.push(element.category);
        }
      });
      this.setState({ categories: categories });
      // this.setState({ view: categories[0]})
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    this.setState({view: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>1-to-1 Generator</h1>
        </header>
        <label>
          Pick your category: <select value={this.state.view} onChange={this.handleChange}>
          {this.state.categories.map((category, key) => (
            <option value={category} key={key+"option"}>{category}</option>
          ))}
          </select>
        </label>
        <Questions category={this.state.view} questions={this.state.data.filter((item, key) => { return item.category === this.state.view })} key={this.state.view}></Questions>
      </div>
    );
  }
}

export default App;


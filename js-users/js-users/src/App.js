import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    users: []
  };

  componentDidMount() {
    fetch("http://js-assessment-backend.herokuapp.com/users.json")
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            users: data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <ul>
            {this.state.users.map((user, index) => {
              return (
                <li key={index}>
                  {user.first_name}
                </li>
              )
            })};
          </ul>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}
export default App;

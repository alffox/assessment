import React from 'react';
import logo from './logo.svg';
import './App.css';

import Pagination from 'react-bootstrap/Pagination' // Inspired by https://react-bootstrap.netlify.com/components/pagination/#pagination
import Table from 'react-bootstrap/Table' // Inspired by https://react-bootstrap.netlify.com/components/table/#tables

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      currentPage: 1,
      usersPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

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
    // Solution inspired by https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
    const indexOfLastUser = this.state.currentPage * this.state.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
    const currentUsers = this.state.users.slice(indexOfFirstUser, indexOfLastUser);

    const renderUsers = currentUsers.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.created_at}</td>
        </tr>
      )
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.users.length / this.state.usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Pagination.Item
          key={number}
          id={number}
          active={number === this.state.currentPage}
          onClick={this.handleClick}
        >
          {number}
        </Pagination.Item>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {renderUsers}
              </tbody>
            </Table>
            <div>
              <Pagination size="small">{renderPageNumbers}</Pagination>
            </div>
          </div>
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

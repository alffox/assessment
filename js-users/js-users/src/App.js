import React from 'react';
import './App.css';

import { Container, Row, Col, Pagination, Table } from 'react-bootstrap';

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
    this.handlePaginatorClick = this.handlePaginatorClick.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  handlePaginatorClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  toggleStatus(user) {
    if (user.status === "active") {
      user.status = "locked";
      this.setState({ user: !this.state.user })
    } else if (user.status === "locked") {
      user.status = "active";
      this.setState({ user: !this.state.user })
    }
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
          <td>{user.status}</td>
          {user.status === "active" ? (
            <td onClick={this.toggleStatus.bind(this, user)}>0</td>
          ) : (
              <td onClick={this.toggleStatus.bind(this, user)}>X</td>
            )}
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
          onClick={this.handlePaginatorClick}
        >
          {number}
        </Pagination.Item>
      );
    });

    return (
      <Container>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Toggle Status</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {renderUsers}
            </tbody>
          </Table>
          <Row>
            <Pagination size="small">{renderPageNumbers}</Pagination>
          </Row>
        </Row>
      </Container>
    );
  }
}
export default App;

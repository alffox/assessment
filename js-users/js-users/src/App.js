import React from 'react';
import './App.css';

import { Container, Row, Nav, Navbar, Image } from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import JSUsersError from "./modules/JSUsersError.js";
import JSUsersHeader from "./modules/JSUsersHeader.js";
import JSUsersTable from "./modules/JSUsersTable.js";
import JSCreateUser from "./modules/JSCreateUser.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoading: false,
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
    this.setState({ isLoading: true }, () => {
      fetch("http://js-assessment-backend.herokuapp.com/users.json")
        .then(res => res.json())
        .then(
          (data) => {
            this.setState({
              isLoading: false,
              users: data
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoading: true,
              error
            });
          });
    }
    )
  }

  render() {
    return (
      <Container>
        <JSUsersHeader />
        {this.state.error ? (
          <JSUsersError
            error={this.state.error} />
        ) : (
            <Router>
              <Navbar className="navbar navbar-dark bg-dark expand" expand="lg">
                <Navbar.Brand>JS-Users</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={Link} to="" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/new" >Create New User</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>

              <Switch>
                <Route path="/new" render={(props) =>
                  <JSCreateUser {...props}
                  />}
                />
              </Switch>
              <Switch>
                <Route path="" render={(props) =>
                  <JSUsersTable {...props}
                    isLoading={this.state.isLoading}
                    users={this.state.users}
                    currentPage={this.state.currentPage}
                    usersPerPage={this.state.usersPerPage}
                    toggleStatus={this.toggleStatus}
                    handlePaginatorClick={this.handlePaginatorClick} />}
                />
              </Switch>
            </Router>
          )}
        <small>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small>
      </Container>
    );
  }
}
export default App;

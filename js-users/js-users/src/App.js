import React from 'react';
import './App.css';

import { Container, Row, Nav, Navbar, Form, Button } from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import JSUsersHeader from "./modules/JSUsersHeader.js";
import JSUsersTable from "./modules/JSUsersTable.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      currentPage: 1,
      usersPerPage: 10,
      new_first_name: '',
      new_last_name: ''
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

  handleNewFirstName(e) { // I hit this problem here: https://reactkungfu.com/2015/09/react-js-loses-input-focus-on-typing/
    this.setState({
      new_first_name: e.target.value
    });
  }

  handleNewLastName(e) {
    this.setState({
      new_last_name: e.target.value
    });
  }


  handleNewUserFormSubmission = () => {
    fetch('http://js-assessment-backend.herokuapp.com/users.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: this.state.new_first_name,
        last_name: this.state.new_last_name,
        status: "active"
      })
    })
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

    const CreateUser = () => {
      return (
        <Form>
          <Form.Group controlId="first-name">
            <Form.Control type="input" placeholder="Enter User's First Name" defaultValue={this.state.new_first_name} onBlur={e => this.handleNewFirstName(e)} />
          </Form.Group>
          <Form.Group controlId="last-name">
            <Form.Control type="text" placeholder="Enter User's Last Name" defaultValue={this.state.new_last_name} onBlur={e => this.handleNewLastName(e)} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={(e) => this.handleNewUserFormSubmission(e)}>
            Submit
          </Button>
        </Form>
      )
    }
    return (
      <Container>
        <JSUsersHeader />
        <Router>
          <Navbar className="navbar navbar-dark bg-dark expand" expand="lg">
            <Navbar.Brand href="/">JS Users App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/new" >Create New User</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/" render={(props) =>
              <JSUsersTable {...props}
                users={this.state.users}
                currentPage={this.state.currentPage}
                usersPerPage={this.state.usersPerPage}
                toggleStatus={this.toggleStatus}
                handlePaginatorClick={this.handlePaginatorClick} />}
            />

            <Route exact path="/new" component={CreateUser} />
          </Switch>

        </Router>
      </Container>
    );
  }
}
export default App;

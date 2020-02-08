import React from 'react';
import './App.css';

import { Container, Row, Nav, Navbar, Form, Button, Pagination, Table } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react' // Docs @ https://gitbrent.github.io/bootstrap-switch-button-react/

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import JSUsersHeader from "./modules/JSUsersHeader.js";

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
    // Solution inspired by https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
    const indexOfLastUser = this.state.currentPage * this.state.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
    const currentUsers = this.state.users.slice(indexOfFirstUser, indexOfLastUser);

    const renderUsers = currentUsers.map((user, index) => {
      return (
        <tr key={index}>
          {user.status === "active" ? (
            <td>
              <BootstrapSwitchButton
                size="sm"
                width={75}
                checked={true}
                onlabel='Active'
                offlabel='Locked'
                onChange={this.toggleStatus.bind(this, user)}
              />
            </td>
          ) : (
              <td>
                <BootstrapSwitchButton
                  size="sm"
                  width={75}
                  checked={false}
                  onlabel='Active'
                  offlabel='Locked'
                  onChange={this.toggleStatus.bind(this, user)}
                />
              </td>
            )}
          {user.status === "active" ? (
            <td>{user.first_name}</td>
          ) : (
              <td><del>{user.first_name}</del></td>
            )}
          {user.status === "active" ? (
            <td>{user.last_name}</td>
          ) : (
              <td><del>{user.last_name}</del></td>
            )}
          {user.status === "active" ? (
            <td>{user.created_at}</td>
          ) : (
              <td><del>{user.created_at}</del></td>
            )}
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

    const ciao = () => {
      return (
        <h1>hello world</h1>
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

          <Row>
            <Switch>
              <Route exact path="/" component={JSUsersTable} />
              <Route exact path="/new" component={CreateUser} />
            </Switch>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Status</th>
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
        </Router>
      </Container>
    );
  }
}
export default App;

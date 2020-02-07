import React from 'react';
import './App.css';

import { Container, Row, Col, Card, Form, Button, Pagination, Table, Accordion } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react' // Docs @ https://gitbrent.github.io/bootstrap-switch-button-react/

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    this.handleNewFirstName = this.handleNewFirstName.bind(this);
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

    return (
      <Container>
        <h1 className="text-center">JS-Users App</h1>

        <Router>
          <h3><Link to="/">Home</Link></h3>

          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <Link to="/new">Create New User</Link>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Switch>
                    <Route path="/new">
                      <CreateUser />
                    </Route>
                  </Switch></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Router>

        <Row>
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
      </Container>
    );
  }
}
export default App;

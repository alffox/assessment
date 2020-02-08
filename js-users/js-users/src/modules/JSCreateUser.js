import React from "react";

import { Row, Col, Form, Button, Alert } from 'react-bootstrap';

class JSCreateUser extends React.Component {

    constructor() {
        super();
        this.state = {
            serverMessage: ''
        };
    }

    handleNewFirstName(e) {
        this.setState({
            new_first_name: e.target.value
        });
    }

    handleNewLastName(e) {
        this.setState({
            new_last_name: e.target.value
        });
    }

    handleServerMessage(text) {
        this.setState({
            serverMessage: text
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
            .then(response => response.text())
            .then(
                (text) => {
                    this.handleServerMessage(text)
                },
                (error) => {
                    console.log(error.body);
                });
    };

    render() {
        return (
            <div>
                <br />
                <Form>

                    <Form.Group controlId="first-name">
                        <Form.Control type="input" placeholder="Enter User's First Name" defaultValue={this.props.new_first_name} onChange={e => this.handleNewFirstName(e)} />
                    </Form.Group>

                    <Form.Group controlId="last-name">
                        <Form.Control type="text" placeholder="Enter User's Last Name" defaultValue={this.props.new_last_name} onChange={e => this.handleNewLastName(e)} />
                    </Form.Group>
                    <Button variant="dark" type="button" onClick={(e) => this.handleNewUserFormSubmission(e)}>
                        Submit
                    </Button>
                    <hr />
                    <Alert variant="danger">
                        <p>Can't Submit form: {this.state.serverMessage}</p>
                    </Alert>
                </Form>
            </div>
        );
    }
}

export default JSCreateUser;
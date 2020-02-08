import React from "react";

import { Row, Col, Form, Button, Alert } from 'react-bootstrap';

class JSCreateUser extends React.Component {

    constructor() {
        super();
        this.state = {
            serverMessage: '',
            isFirstNameMissing: null,
            isLastNameMissing: null,
            IsUserCreated: null
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

        if (escape(this.state.serverMessage) === "%7B%22first_name%22%3A%5B%22can%27t%20be%20blank%22%5D%7D") {
            this.setState({
                isFirstNameMissing: true
            });
        }
        if (escape(this.state.serverMessage) === "%7B%22last_name%22%3A%5B%22can%27t%20be%20blank%22%5D%7D") {
            this.setState({
                isLastNameMissing: true
            });
        }
        if (escape(this.state.serverMessage) === "%7B%22first_name%22%3A%5B%22can%27t%20be%20blank%22%5D%2C%22last_name%22%3A%5B%22can%27t%20be%20blank%22%5D%7D") {
            this.setState({
                isFirstNameMissing: true,
                isLastNameMissing: true
            });
        }
        if (this.state.serverMessage.length > 64) {
            this.setState({
                IsUserCreated: true
            });
        }

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
                    <Row>
                        <Col>
                            <Form.Group controlId="first-name">
                                <Form.Control type="input" placeholder="First Name" defaultValue={this.props.new_first_name} onChange={e => this.handleNewFirstName(e)} />
                            </Form.Group>
                        </Col>
                        {this.state.isFirstNameMissing ? (
                            <Col>
                                <Alert variant="info" className="mb-0 py-1">
                                    First Name is required
                                </Alert>
                            </Col>) : (
                                <div></div>
                            )}
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="last-name">
                                <Form.Control sm="3" type="text" placeholder="Last Name" defaultValue={this.props.new_last_name} onChange={e => this.handleNewLastName(e)} />
                            </Form.Group>
                        </Col>
                        {this.state.isLastNameMissing ? (
                            <Col>
                                <Alert variant="info" className="mb-0 py-1">
                                    Last Name is required
                            </Alert>
                            </Col>) : (
                                <div></div>
                            )}
                    </Row>
                    <Button variant="dark" type="button" onClick={(e) => this.handleNewUserFormSubmission(e)}>
                        Submit
                    </Button>
                    <hr />
                    {this.state.IsUserCreated ? (
                        <Alert variant="success">
                            User Created successfully!
                        </Alert>) : (
                            <div></div>
                        )}
                </Form>
            </div>
        );
    }
}

export default JSCreateUser;
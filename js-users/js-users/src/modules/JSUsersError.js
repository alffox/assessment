import React from "react";

import { Card } from 'react-bootstrap';

class JSUsersError extends React.Component {

    render() {
        return (
            <Card bg="danger" text="white" className="text-center">
                <Card.Header as="h5">:( There was an error contacting the server</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Server error message: <strong>{this.props.error.stack}</strong>
                        <hr />
                        Please report the below error message at: <a href="https://github.com/alffox/js-exercises/issues" target="_blank" rel="noopener noreferrer">https://github.com/alffox/js-exercises/issues</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default JSUsersError;
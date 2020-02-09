import React from "react";

import { Spinner } from 'react-bootstrap';

class JSUsersSpinner extends React.Component {

    render() {
        return (
            <div className="text-center">
                <Spinner
                    animation="border"
                    variant="light"
                    className="spinner"
                />
                <div className="spinner">Loading data ...</div>
            </div>
        );
    }
}

export default JSUsersSpinner;
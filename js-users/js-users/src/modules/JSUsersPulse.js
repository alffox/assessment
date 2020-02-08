import React from "react";

import { Spinner } from 'react-bootstrap';

class JSUsersPulse extends React.Component {

    render() {
        return (
            <div className="text-center">
                <Spinner animation="grow" />Loading data ...
            </div>
        );
    }
}

export default JSUsersPulse;
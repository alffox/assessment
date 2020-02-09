import React from "react";

import logo from "../logo.svg";

import { Image } from 'react-bootstrap';

class JSUsersHeader extends React.Component {
    render() {
        return (
            <header className="d-flex flex-wrap">
                <Image
                    className="logo"
                    src={logo}
                    alt="Pencil Cup"
                />
                <h1 className="text-center mt-3">JS-Users App</h1>
            </header>
        );
    }
}

export default JSUsersHeader;
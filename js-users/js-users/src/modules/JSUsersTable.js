import React from "react";

import JSUsersPagination from "./JSUsersPagination.js";
import JSUsersSpinner from "./JSUsersSpinner.js";
import { Table } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react' // Docs @ https://gitbrent.github.io/bootstrap-switch-button-react/
import Moment from 'react-moment';

class JSUsersTable extends React.Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            usersPerPage: 10
        };
        this.handlePaginatorClick = this.handlePaginatorClick.bind(this);
    }

    handlePaginatorClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        // Solution inspired by https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
        const indexOfLastUser = this.state.currentPage * this.state.usersPerPage;
        const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
        const currentUsers = this.props.users.slice(indexOfFirstUser, indexOfLastUser);

        return (
            <div>
                {this.props.isLoading ? (
                    <JSUsersSpinner />
                ) : (
                        <Table striped bordered hover responsive variant="dark">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, index) => {
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
                                                        onChange={this.props.toggleStatus.bind(this, user)}
                                                        onstyle="light"
                                                        offstyle="dark"
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
                                                            onChange={this.props.toggleStatus.bind(this, user)}
                                                            onstyle="light"
                                                            offstyle="dark"
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
                                                <td><Moment format="DD MMMM GGGG, hh:mm:ss">{user.created_at}</Moment></td>
                                            ) : (
                                                    <td><del><Moment format="DD MMMM GGGG, hh:mm:ss">{user.created_at}</Moment></del></td>
                                                )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                <JSUsersPagination
                    users={this.props.users}
                    currentPage={this.state.currentPage}
                    usersPerPage={this.state.usersPerPage}
                    handlePaginatorClick={this.handlePaginatorClick}
                />
            </div>
        );
    }
}

export default JSUsersTable;
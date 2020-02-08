import React from "react";

import { Table, Pagination } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react' // Docs @ https://gitbrent.github.io/bootstrap-switch-button-react/
import Moment from 'react-moment';


class JSUsersTable extends React.Component {

    render() {
        // Solution inspired by https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
        const indexOfLastUser = this.props.currentPage * this.props.usersPerPage;
        const indexOfFirstUser = indexOfLastUser - this.props.usersPerPage;
        const currentUsers = this.props.users.slice(indexOfFirstUser, indexOfLastUser);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.users.length / this.props.usersPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <Pagination.Item
                    key={number}
                    id={number}
                    active={number === this.props.currentPage}
                    onClick={this.props.handlePaginatorClick.bind(this)}
                >
                    {number}
                </Pagination.Item>
            );
        });
        return (
            <div>
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
                <Pagination size="small" className="d-flex flex-wrap">{renderPageNumbers}</Pagination>
            </div>
        );
    }
}

export default JSUsersTable;
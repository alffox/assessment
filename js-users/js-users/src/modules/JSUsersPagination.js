import React from "react";

import { Pagination } from 'react-bootstrap';

class JSUsersPagination extends React.Component {

    render() {
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
            <Pagination size="small" className="d-flex flex-wrap">{renderPageNumbers}</Pagination>
        );
    }
}

export default JSUsersPagination;
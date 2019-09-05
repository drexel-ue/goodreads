import React from "react";
import { withRouter } from "react-router-dom";
import BookShelfIndex from '../bookshelf/BookShelfIndex';

const Bookshelf = (props) => {
    switch (props.match.params.shelf) {
        case "all":
            return (
                <BookShelfIndex />
            );
        case "read":
            return (
                <BookShelfIndex />
            );
        case "reading":
            return (
                <BookShelfIndex />
            );
        case "want":
            return (
                <BookShelfIndex />
            );
        default:
            return null;
    }
};

export default withRouter(Bookshelf);
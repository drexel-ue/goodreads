import React from "react";
import { withRouter } from "react-router-dom";
import BookShelfIndex from '../bookshelf/BookShelfIndex';

const Bookshelf = (props) => {
    switch (props.match.params.shelf) {
        case "read":
            return (
                <BookShelfIndex idx={2} type='read'/>
            );
        case "reading":
            return (
                <BookShelfIndex idx={0} type='reading'/>
            );
        case "want":
            return (
                <BookShelfIndex idx={1} type='want'/>
            );
        default:
            return null;
    }
};

export default withRouter(Bookshelf);
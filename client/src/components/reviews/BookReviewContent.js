import React, { Component } from "react";
import "./BookReview.css";

export default class ReviewContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.exdepand = this.exdepand.bind(this);
    }

    exdepand(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const expanderStyle = this.state.expanded ? {} : { height: "207px" };

        return (
            <div>
                <div className="review-content"style={expanderStyle}>
                    {this.props.content}
                </div>
                <div className="review-content-expander" onClick={this.exdepand}>
                    {this.state.expanded ? "(less)" : "...more"}
                </div>
            </div>
        );
    }
}
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import gql from "graphql-tag";
import "./BookReview.css"

const { FETCH_REVIEWS_BY_BOOK } = Queries
class BookReview extends React.Component{
    constructor(props){
        super(props)
        // debugger
    }

    render() {
        return (
            <Query
                query={FETCH_REVIEWS_BY_BOOK}
                variables={{ bookId: this.props.bookId }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) {
                        return <p>Error</p>;
                    }
                    const { reviews } = data
                    let allReviews = []
                    data.reviews.map(review =>
                        allReviews.push({
                            user: review.user,
                            content: review.content,
                        })
                    )
                    console.log(reviews)
                    return (
                        <div>555</div>
                    )}}
            </Query>
        )
    }

}

export default withRouter(BookReview)
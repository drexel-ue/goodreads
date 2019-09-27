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
                    const { reviewByBookId } = data
                    let allReviews = []
                    reviewByBookId.map(review =>
                        allReviews.push({
                            userId: review.user._id,
                            username: review.user.name,
                            profilePhoto: review.user.profilePhoto,
                            content: review.content,
                        })

                    )
                    console.log(allReviews)
                    return (
                        <ul className="review-list-container">
                            {allReviews.map((review, index) => 
                                <li className="review-list-item-container"key={index}>
                                    <img className="review-list-item-photo" src={review.profilePhoto}/> 
                                    <div className="review-list-item-subcontainer">   
                                        <div className="review-list-item-name">{review.username}</div>
                                        <div className="review-list-item-content">"{review.content}"</div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    )}}
            </Query>
        )
    }

}

export default withRouter(BookReview)
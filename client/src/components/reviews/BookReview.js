import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import gql from "graphql-tag";
import BookReviewContent from "./BookReviewContent"
import RatedRow from "../book/RatedRow"
import "./BookReview.css"

const { FETCH_REVIEWS_BY_BOOK, FETCH_RATING_BY_USER_AND_BOOK_ID } = Queries

class BookReview extends React.Component{
    constructor(props){
        super(props)
        // debugger
    }

    render() {
        return (
            <ApolloConsumer>{client => (
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
                            date: new Date(review.date)
                        })
                    )
                    console.log(allReviews)
                    return (
                        <ul className="review-list-container">
                            {allReviews.map((review, index) => 
                                <li className="review-list-item-container"key={index}>
                                    <img className="review-list-item-photo" src={review.profilePhoto}/> 
                                    <div className="review-list-item-subcontainer">   
                                        <div className="review-list-item-name-date-container">
                                            <div className="review-list-item-name">{review.username}</div>
                                            <div className="review-list-item-date">{review.date.toDateString()}</div>
                                        </div>
                                        <Query 
                                            query={FETCH_RATING_BY_USER_AND_BOOK_ID}
                                            variables={{ bookId: this.props.bookId, userId: review.userId }}
                                            >
                                                {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                // debugger
                                                if (error) {
                                                    return <p>Error</p>;
                                                }
                                            return (
                                                <RatedRow rating={data.ratingByUserAndBookId.stars}></RatedRow>
                                            )
                                            }}
                                        </Query>
                                        <BookReviewContent 
                                            className="review-list-item-content"
                                            content={review.content}>
                                        </BookReviewContent>
                                    </div>
                                </li>
                            )}
                        </ul>
                    )}}
            </Query>)}
            </ApolloConsumer>
        )
    }

}

export default withRouter(BookReview)
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations"
import gql from "graphql-tag";
import "./CreateReview.css"

const { CREATE_REVIEW } = Mutations
const { FETCH_REVIEWS_BY_BOOK, BOOK_BY_ID } = Queries

class CreateReview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: "",
            hidden: false,
            // dateStarted: "",
            // dateFinished: "",
            recommendTo: "",
            privateNotes: "",
            owned: false,
            postToBlog: false,
            addToFeed: false,
            user: "",
            book: this.props.match.params.bookId
        };
        this.timeout = undefined
        this.handleSubmit.bind(this)   
        this.updateCache.bind(this)
        this.updateBoxes.bind(this) 
    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateBoxes(field) {
        return e => {
            console.log(`before : `, this.state)
            console.log(`before : `, this.state[field])
            this.setState({ [field]: !this.state[field] }, () => console.log("after : ", this.state))}
    }

    updateCache(cache, { data }) {
        let reviews;
        try {
            // if we've already fetched the products then we can read the
            // query here
            reviews = cache.readQuery({ query: FETCH_REVIEWS_BY_BOOK, variables: { bookId: this.state.book} });
        } catch (err) {
            return;
        }
        // if we had previously fetched products we'll add our new product to our cache
        if (reviews) {
            let reviewsArray = reviews.reviewByBookId;
            let newReview = data.createReview;
            let newArray = reviewsArray.concat(newReview)
            cache.writeQuery({
                query: FETCH_REVIEWS_BY_BOOK,
                variables: { bookId: this.state.book },
                data: { reviewByBookId: newArray }
            });
        }
    }

    handleSubmit(e, newReview) {
        e.preventDefault();
        // let redirectURL = `#/book/${this.state.book}`;
        // setTimeout(
            newReview({
                variables: {
                    user: this.state.user,
                    book: this.state.book,
                    content: this.state.content,
                    hidden: this.state.hidden,
                    recommendTo: this.state.recommendTo,
                    privateNotes: this.state.privateNotes, 
                    owned: this.state.owned,
                    postToBlog: this.state.postToBlog,
                    addToFeed: this.state.addToFeed
                }
            })
            // window.location.href = redirectURL

        // , 2000)
    }

    render() {
        return(
        <ApolloConsumer>{client => {
                const user = client.readQuery({
                    query: gql`
                        query CachedUser{
                            _id
                        }
                    `
                    })
                    this.state.user = user._id
                    return (
                        <div className="review-container">
                        <Query query={BOOK_BY_ID} 
                            variables={{ _id: this.state.book }}>
                            {({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) {
                                    return <p>Error</p>;
                                }
                                const { book } = data
                                let authors = []
                                book.authors.map(author => 
                                    authors.push(author.name)
                                )
                                return (
                                    <div className="review-book-container">
                                        <img className="review-book-img" src={book.coverPhoto}></img> 
                                        <div className="review-book-details-container">
                                            <Link to={`/book/${this.state.book}`} className="review-book-title">{book.title}</Link>
                                            <div>by {authors.join(", ")}</div>
                                        </div> 
                                    </div>
                                )
                                }}
                        </Query>
                        <Mutation
                            mutation={CREATE_REVIEW}
                            onError={err => this.setState({ message: err.message })}
                            update={(cache, data) => this.updateCache(cache, data)}
                            onCompleted={data => {
                                let redirectURL = `#/book/${this.state.book}`
                                this.setState({
                                    message: `New review created successfully`
                                }, () => {
                                    this.timeout = setTimeout( () => {
                                        window.location.href = redirectURL
                                    }, 2000)
                                } ) 
                                }
                            }
                        >
                        {(newReview, { data } ) =>
                            (<div className="review-form-container">
                                <form onSubmit={e => this.handleSubmit(e, newReview)}>
                                    <div className="review-form-content-container">What did you think?
                                    <textarea
                                        className="review-form-content"
                                        onChange={this.update("content")}
                                        value={this.state.content}
                                        placeholder="Enter your review(optional)"
                                        />
                                    </div>
                                    <div className="review-form-hidden-container">
                                        <input value={this.state.hidden} 
                                            onChange={this.updateBoxes("hidden")}
                                            className="review-form-hidden"
                                            type="checkbox">
                                        </input>
                                        <label htmlFor="review-form-hidden">{`   Hide entire review because of spoilers`}</label>
                                    </div>
                                    <div className="review-form-recommend-to-container">
                                        <label
                                            htmlFor="review-form-recommend-to">
                                                {`I would like to recommend to: `}
                                        </label>
                                        <input
                                            className="review-form-recommend-to"
                                            onChange={this.update("recommendTo")}
                                            value={this.state.recommendTo}
                                        />
                                    </div>
                                    <div className="review-form-private-notes-container">
                                        Private notes, shown only to you:
                                        <textarea
                                            className="review-form-private-notes"
                                            onChange={this.update("privateNotes")}
                                            value={this.state.privateNotes}
                                        />
                                    </div>
                                    <div className="review-form-owned-container">
                                        <input value={this.state.owned}
                                            onChange={this.updateBoxes("owned")}
                                            className="review-form-owned"
                                            type="checkbox">
                                        </input>
                                        <label
                                            htmlFor="review-form-owned ">
                                            {`  I own a copy of this book`}
                                        </label>
                                    </div>
                                    <div className="review-form-submit-container">
                                        <button
                                            className="review-form-submit"
                                            type="submit">
                                            Save
                                        </button>
                                        <div className="review-form-bottom-right">
                                            <div className="review-form-postToBlog-container">
                                                <input value={this.state.postToBlog}
                                                    onChange={this.updateBoxes("postToBlog")}
                                                    className="review-form-postToBlog"
                                                    type="checkbox">
                                                </input>
                                                <label
                                                    htmlFor="review-form-postToBlog ">
                                                    {`   Post to blog`}
                                                </label>
                                            </div>
                                            <div className="review-form-addToFeed-container">
                                                <input value={this.state.addToFeed}
                                                    onChange={this.updateBoxes("addToFeed")}
                                                    className="review-form-addToFeed"
                                                    type="checkbox">
                                                </input>
                                                <label
                                                    htmlFor="review-form-addToFeed ">
                                                    {`   Add to my update feed`}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                <p>{this.state.message}</p>
                                </form>
                            </div >
                            )} 
                    </Mutation>
                    </div>
            )}}</ApolloConsumer>
        )
    }

}

export default withRouter(CreateReview)
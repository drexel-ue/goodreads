import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations"
import gql from "graphql-tag";

const { CREATE_REVIEW } = Mutations
const { FETCH_REVIEWS } = Queries

class CreateReview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: "",
            hidden: true,
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
        this.handleSubmit.bind(this)   
        this.updateCache.bind(this)   
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(cache, { data }) {
        let reviews;
        try {
            // if we've already fetched the products then we can read the
            // query here
            reviews = cache.readQuery({ query: FETCH_REVIEWS });
        } catch (err) {
            return;
        }
        // if we had previously fetched products we'll add our new product to our cache
        if (reviews) {
            let reviewsArray = reviews.reviews;
            let newReview = data.newReview;
            cache.writeQuery({
                query: FETCH_REVIEWS,
                data: { reviews: reviewsArray.concat(newReview) }
            });
        }
    }

    handleSubmit(e, newReview) {
        e.preventDefault();
        console.log(this.state)
        newReview({
            variables: {
                content: this.state.content,
                hidden: this.state.hidden,
                // dateStarted: this.state.dateStarted,
                // dateFinished: this.state.dateFinished,
                recommendTo: this.state.recommendTo,
                privateNotes: this.state.privateNotes, 
                owned: this.state.owned,
                postToBlog: this.state.postToBlog,
                addToFeed: this.state.addToFeed
            }
        });
        // debugger
    }

    render() {
        return(
        <ApolloConsumer>{client => {
                const user = client.readQuery({
                    query: gql`
                    query CachedUser{
                        _id
                    }
                    `})
                    this.state.user = user._id
                return (
                        <Mutation
                        mutation={CREATE_REVIEW}
                        onError={err => this.setState({ message: err.message })}
                        // we need to make sure we update our cache once our new product is created
                        update={(cache, data) => this.updateCache(cache, data)}
                        // when our query is complete we'll display a success message
                        onCompleted={data => 
                            this.setState({
                                message: `New review created successfully`
                            })
                        }
                    >
                        {(newReview, { data } ) =>
                            (< div >
                                <form onSubmit={e => this.handleSubmit(e, newReview)}>
                                    <textarea
                                        onChange={this.update("content")}
                                        value={this.state.content}
                                        placeholder="content"
                                    />
                                    <select value={this.state.hidden} onChange={this.update("hidden")}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                    {/* <input
                                        type="date"
                                        onChange={this.update("dateStarted")}
                                        value={this.state.dateStarted}
                                        placeholder="Date Started"
                                    />
                                    <input
                                        type="date"
                                        onChange={this.update("dateFinished")}
                                        value={this.state.dateFinished}
                                        placeholder="Date Finished"
                                    /> */}
                                    <input
                                        onChange={this.update("recommendTo")}
                                        value={this.state.recommendTo}
                                        placeholder="Recommend to"
                                    />
                                    <textarea
                                        onChange={this.update("privateNotes")}
                                        value={this.state.privateNotes}
                                        placeholder="privateNotes"
                                    />
                                    <select value={this.state.owned} onChange={this.update("owned")}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                    <select value={this.state.postToBlog} onChange={this.update("postToBlog")}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                    <select value={this.state.addToFeed} onChange={this.update("addToFeed")}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                    <button type="submit">Post Review</button>
                                </form>
                                <p>{this.state.message}</p>
                            </div >)
                             } 
                    </Mutation>
                )
            }}</ApolloConsumer>
        )
    }

}

export default withRouter(CreateReview)
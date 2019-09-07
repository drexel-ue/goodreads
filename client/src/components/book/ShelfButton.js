import React, { Component } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
// import {withRouter}from'react-router-dom'
import "./BookShow.scss";

const { SHELVES_BY_USER } = Queries;
const { ADD_TO_SHELF } = Mutations;

export default class ShelfButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: false
    };

    this.timeOut = undefined;

    this.show = this.show.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.timerHide = this.timerHide.bind(this);
  }

  show(event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.timeOut);
    this.setState({ showing: true });
  }

  toggleShow(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showing: !this.state.showing });
  }

  timerHide(event) {
    event.preventDefault();
    event.stopPropagation();
    const that = this;
    this.timeOut = setTimeout(() => {
      that.setState({ showing: false });
    }, 3000);
  }

  updateCache(client, { data }) {
    // here we can write directly to our cache with our returned mutation data
      console.log(data)
      const shelf = data.addShelfBook;
    client.writeData({
        data: {
          [shelf._id]:shelf
      }
    });
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          const user = client.readQuery({
            query: gql`
              query CachedUser {
                _id
              }
            `
          });

          return (
            <Query query={SHELVES_BY_USER} variables={{ _id: user._id }}>
              {({ loading, data, error }) => {
                if (loading) return <p>Loading...</p>;
                if (error) {
                  console.log(error);
                  return <p>Error</p>;
                }

                console.log("pizza", data);
                const shelves = data.shelvesByUser;
                const show = this.state.showing ? "shelves" : "hide";
                const containingShelf = shelves.find(shelf =>
                  shelf.bookIds.includes(this.props._id)
                );

                return (
                  <div className="shelf_button">
                    <div className="want_to_read">
                      {containingShelf
                        ? `${containingShelf.name}`
                        : "Want to read"}
                    </div>
                    <div className="dropdown_button">
                      <i
                        className="fas fa-caret-down"
                        onMouseEnter={this.show}
                        onClick={this.toggleShow}
                        onMouseLeave={this.timerHide}
                      ></i>
                      <div
                        className={show}
                        onMouseEnter={this.show}
                        onMouseLeave={this.timerHide}
                      >
                        {shelves.map(shelf => (
                          <div key={shelf._id}>
                            <Mutation
                              mutation={ADD_TO_SHELF}
                              update={(client, data ) => this.updateCache(client,data)}
                            >
                              {(addToShelf, _) => {
                                return (
                                  <div
                                    className="shelf"
                                    onClick={event => {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      addToShelf({
                                        variables: {
                                          shelfId: shelf._id,
                                          bookId: this.props._id
                                        }
                                      });
                                    }}
                                  >
                                    {shelf.name}
                                  </div>
                                );
                              }}
                            </Mutation>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </ApolloConsumer>
    );
  }
}

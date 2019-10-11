import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import './UserProfile.css';

const { FETCH_USER_PROFILE } = Queries;

const UserProfile = props => {
    return (
        <ApolloConsumer>{client => (
            <Query query={FETCH_USER_PROFILE} variables={{ _id: props.match.params.userId }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;

                    return (
                        <div className='profile-container'>
                            <div className='profile'>
                                <div className='profile-float'>
                                    <div className='left-profile-container'>
                                        <div className='profile-picture'>
                                            <img src={data.user.profilePhoto} alt='user'></img>
                                            <br></br>
                                        </div>
                                        <div className='user-info'>
                                            <div className='user-info-body'>
                                                <div className='user-info-content'>
                                                    <h1>{data.user.name}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='clear'></div>
                                        <br></br>
                                    </div>
                                </div>
                                <div className='clear'></div>
                            </div>
                            <div className='clear'></div>
                        </div>
                    )
                }}
            </Query>
        )}</ApolloConsumer>
    );
}

export default UserProfile;
import React from "react";
import AuthRoute from "./session/AuthRoute";
import Nav from "./nav/Nav";
import AuthHome from './links/home/AuthHome';
import ProtectedHome from './links/home/ProtectedHome';
import Bookshelf from './links/bookshelf/Bookshelf';
import Recommendations from './links/recommendations/Recommendation';
import NewReleases from './links/new_releases/NewReleases';
import List from './links/list/List';
import Explore from './links/explore/Explore';
import Group from './links/groups/Group';
import Discussion from './links/discussions/Discussion';
import Quotes from './links/quotes/Quote';
import People from './links/people/People';
import Inbox from './links/message/Inbox';
import EditGenres from './links/genres/EditGenres';
import FriendRecommendations from './links/recommendations/FriendRecommendations';
import {
  // Route,
  Switch
} from "react-router-dom";
import Login from "./session/Login";
import Friends from "./friend/friends";
import IndexGenre from "./genres/IndexGenre"
import ShowGenre from "./genres/ShowGenre"
import CreateReview from "./reviews/CreateReview"

const App = () => {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <Switch>
        <AuthRoute
          exact={true}
          path="/login"
          component={Login}
          routeType="auth"
        />
        <AuthRoute
          exact={true}
          path="/register"
          component={AuthHome}
          routeType="auth"
        />
        <AuthRoute

          exact
          path="/"
          component={ProtectedHome}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/bookshelf/:shelf"
          component={Bookshelf}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/recommendations"
          component={Recommendations}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/new_releases"
          component={NewReleases}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/list"
          component={List}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/book"
          component={Explore}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/group"
          component={Group}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/topic"
          component={Discussion}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/quotes"
          component={Quotes}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/best_reviewers"
          component={People}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/inbox"
          component={Inbox}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/friend"
          component={Friends}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/edit_fav_genres"
          component={EditGenres}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/genres"
          component={IndexGenre}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/genres/:genre"
          component={ShowGenre}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/friend_recommendations"
          component={FriendRecommendations}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/reviews"
          component={CreateReview}
          routeType="protected"
        />
      </Switch>
    </div>
  );
};

export default App;
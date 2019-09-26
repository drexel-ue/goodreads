import React from "react";
import AuthRoute from "./session/AuthRoute";
import Nav from "./nav/Nav";
import AuthHome from './links/home/AuthHome';
import Bookshelf from './links/bookshelf/Bookshelf';
import NewReleases from './links/new_releases/NewReleases';
import Explore from './links/explore/Explore';
import {
  // Route,
  Switch
} from "react-router-dom";
import Login from "./session/Login";
import Friends from "./friend/friends";

import IndexGenre from "./genres/IndexGenre";
import BookShow from "./book/BookShow";
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
          path="/bookshelf/:shelf"
          component={Bookshelf}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/book/:bookId"
          component={BookShow}
          routeType="protected"
        />
        <AuthRoute
          exact
          path="/"
          component={NewReleases}
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
          path="/friend"
          component={Friends}
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
          path="/reviews/:bookId"
          component={CreateReview}
          routeType="protected"
        />
      </Switch>
    </div>
  );
};

export default App;
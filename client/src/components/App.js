import React from "react";
import Nav from "./nav/Nav";
import AuthHome from "./home/AuthHome";
import ProtectedHome from "./home/ProtectedHome";
import Bookshelf from "./bookshelf/Bookshelf";
import Recommendations from "./recommendations/Recommendation";
import NewReleases from "./new_releases/NewReleases";
import List from "./list/List";
import Explore from "./explore/Explore";
import Group from "./groups/Group";
import Discussion from "./discussions/Discussion";
import Quotes from "./quotes/Quote";
import People from "./people/People";
import Inbox from "./message/Inbox";
import EditGenres from "./genres/EditGenres";
import FriendRecommendations from "./recommendations/FriendRecommendations";
import {
  // Route,
  Switch
} from "react-router-dom";
import AuthRoute from "./session/AuthRoute";
import Login from "./session/Login";
import Friends from "./friend/Friends";

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
          path="/bookshelf"
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
        <AuthRoute exact path="/list" component={List} routeType="protected" />
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
          exact={false}
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
          path="/friend_recommendations"
          component={FriendRecommendations}
          routeType="protected"
        />
      </Switch>
    </div>
  );
};

export default App;

import React, { Component } from "react";
import Posts from "./Posts/posts";
// import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent"; //lazy loading way
import classes from "./Blog.css";
import { Route, NavLink, withRouter, Switch, Redirect } from "react-router-dom";

const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  render() {
    console.log("blog::: ", this.props);
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact activeClassName={classes.active}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#hello",
                    search: "?quick-test=true"
                  }}
                  activeClassName={classes.active}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/new-post" component={AsyncNewPost} />
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Blog);

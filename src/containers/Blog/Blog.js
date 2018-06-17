import React, { Component } from "react";
import Posts from "./Posts/posts";
import NewPost from "./NewPost/NewPost";
import classes from "./Blog.css";
import { Route, Link } from "react-router-dom";

class Blog extends Component {
  render() {
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/new-post",
                    hash: "#hello",
                    search: "?quick-test=true"
                  }}
                >
                  New Post
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <Route path="/" exact render={() => <h1>hello</h1>} />
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" exact component={NewPost} />
      </div>
    );
  }
}

export default Blog;

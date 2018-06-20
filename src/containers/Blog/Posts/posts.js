import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import React, { Component } from "react";
import classes from "./posts.css";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";

class posts extends Component {
  state = { posts: [], postId: null };
  componentDidMount() {
    axios
      .get("/posts")
      .then(results => {
        const posts = results.data;
        const updatedPosts = posts.slice(0, 4).map(post => {
          return { ...post, author: "Frank" };
        });

        this.setState({ posts: updatedPosts });
        console.log("results is ", results, this.state.posts);
      })
      .catch(error => this.setState({ error }));
  }

  postSelectHandler = id => {
    console.log("my id: ", id, this.props);
    this.setState({ postId: id });
    this.props.history.push(`${this.props.match.url}/${id}`);
  };

  render() {
    let myPosts = this.state.posts.map(post => {
      return (
        // <Link to={"/" + post.id} key={post.id}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectHandler(post.id)}
        />
        // </Link>
      );
    });
    if (this.state.error)
      myPosts = (
        <h3 style={{ textAlign: "center", color: "red" }}>
          Error: can't get posts
        </h3>
      );
    console.log("myPosts", myPosts);
    return (
      <div>
        <section className={classes.Posts}>{myPosts}</section>
        <Route
          path={`${this.props.match.url}/:id`}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default posts;

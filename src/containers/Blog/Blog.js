import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import classes from "./Blog.css";

class Blog extends Component {
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

  postSelectHandler(id) {
    console.log("my id: ", id);
    this.setState({ postId: id });
  }

  render() {
    let myPosts = this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectHandler(post.id)}
        />
      );
    });
    if (this.state.error)
      myPosts = (
        <h3 style={{ textAlign: "center", color: "red" }}>
          {" "}
          Error: can't get posts
        </h3>
      );
    console.log("myPosts", myPosts);
    return (
      <div>
        <section className={classes.Posts}>{myPosts}</section>
        <section>
          <FullPost id={this.state.postId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;

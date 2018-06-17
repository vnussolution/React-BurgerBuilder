import React, { Component } from "react";
import axios from "../../axios";

import classes from "./FullPost.css";

class FullPost extends Component {
  state = { loadedPost: null };
  componentDidUpdate() {
    if (
      (this.props.id && !this.state.loadedPost) ||
      (this.props.id &&
        this.state.loadedPost &&
        this.state.loadedPost.id !== this.props.id)
    ) {
      console.log("aaa", this.props.id);
      axios.get("/photos/" + this.props.id).then(response => {
        this.setState({ loadedPost: response.data });
        console.log("loadedPost: ", response.data);
      });
    }
  }
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id && this.state.loadedPost)
      post = (
        <div className={classes.FullPost}>
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className={classes.Edit}>
            <button className={classes.Delete}>Delete</button>
          </div>
        </div>
      );
    return post;
  }
}

export default FullPost;

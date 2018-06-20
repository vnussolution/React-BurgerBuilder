import React, { Component } from "react";
import axios from "../../../axios";

import classes from "./FullPost.css";

class FullPost extends Component {
  state = { loadedPost: null };

  componentDidMount() {
    this.loadPost();
  }

  componentDidUpdate() {
    this.loadPost();
  }

  loadPost() {
    console.log(this.props);
    if (
      (this.props.match.params.id && !this.state.loadedPost) ||
      (this.props.match.params.id &&
        this.state.loadedPost &&
        this.state.loadedPost.id != this.props.match.params.id)
    ) {
      axios.get("/photos/" + this.props.match.params.id).then(response => {
        this.setState({ loadedPost: response.data });
        console.log("loadedPost: ", response.data);
      });
    }
  }

  deletePost = () => {
    axios.delete("/photos/" + this.state.loadedPost.id).then(response => {
      console.log("delete post;", response);
    });
  };
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id && this.state.loadedPost)
      post = (
        <div className={classes.FullPost}>
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className={classes.Edit}>
            <button className={classes.Delete} onClick={this.deletePost}>
              Delete
            </button>
          </div>
        </div>
      );
    return post;
  }
}

export default FullPost;

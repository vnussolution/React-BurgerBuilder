import React, { Component } from "react";
import axios from "axios";
import classes from "./NewPost.css";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Max",
    redirect: false
  };

  componentDidMount = () => {
    console.log("componentDidMount: NewPost ", this.props);
  };

  sendPost = () => {
    const dataPost = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author
    };
    axios({
      method: "post",
      url: "/posts",
      data: dataPost
    }).then(response => {
      console.log("post: ", response);
      this.setState({ redirect: true });
    });
    // .post("https://jsonplaceholder.typicode.com/posts", data)
    // .then(response => {
    //   console.log("post :", response);
    // });
  };

  render() {
    let redirect = this.state.redirect ? <Redirect to="/Posts" /> : null;
    return (
      <div className={classes.NewPost}>
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.sendPost}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
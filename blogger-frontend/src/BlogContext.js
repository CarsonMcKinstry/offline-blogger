import React, { Component } from 'react';
import { getTopics, getSavedPosts } from './api';
import { createPost, getUnsavedPosts } from './db';

const { Provider, Consumer } = React.createContext();


class BlogProvider extends Component {

  state = {
    topicsLoading: true,
    savedPostsLoading: true,
    unsavedPostsLoading: true,
    topics: [],
    savedPosts: [],
    unsavedPosts: []
  }

  componentWillMount() {
    this.setState({topicsLoading: true, postsLoading: true})
  }

  componentDidMount() {
    this.loadTopics();
    this.loadSavedPosts();
    this.loadUnsavedPosts();
  }

  loadSavedPosts () {
    getSavedPosts()
      .then(posts => posts.map(post => ({...post, saved: true})))
      .then(posts => {
        this.setState({
          savedPosts: posts,
          savedPostsLoading: false
        });
      })
  }
  
  loadUnsavedPosts() {
    getUnsavedPosts()
      .then(posts => posts.map(post => ({...post, saved: post.synced})))
      .then(posts => {
        this.setState({
          unsavedPosts: posts,
          unsavedPostsLoading: false
        });
      });
  }

  createPost = (obj) => {
    return createPost(obj)
      .then(() => getUnsavedPosts())
      .then(posts => posts.map(post => ({...post, saved: post.synced})))
      .then(posts => {
        this.setState({
          unsavedPosts: posts,
          unsavedPostsLoading: false
        });
      });
  }

  loadTopics () {
    getTopics()
      .then(topics => topics.map(topic => ({value: topic.id, label: topic.topic})))
      .then(topics => {
        this.setState({
          topics,
          topicsLoading: false
        })
      });
  }

  render() {
    return (
      <Provider value={{
        ...this.state,
        createPost: this.createPost
      }}>
        {this.props.children}
      </Provider>
    )
  }
}

export default BlogProvider;
export const BlogConsumer = Consumer;
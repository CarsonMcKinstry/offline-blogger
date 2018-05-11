import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Post from './Post';

const renderPost = ({id, title, author, topic, saved}) => <Post key={id} title={title} author={author} topic={topic} saved={saved}/>;


class Posts extends Component {

  render() {
    if (this.props.savedPostsLoading || this.props.unsavedPostsLoading){
      return <CircularProgress size={80} thickness={5}/>
    }
    
    return (
      <div className="card-deck">
      { this.props.unsavedPosts.map(renderPost)}
      { this.props.savedPosts.map(renderPost)}
      </div>
    );
  }

}

Posts.propTypes = {
};

export default Posts;
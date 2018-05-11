import React, { Component, Fragment} from 'react';
import { BlogConsumer } from './BlogContext';
import './App.css';
import Form from './Form';
import Posts from './Posts';
import './PostSync';

class App extends Component {

  render() {
    return (
      <h1>Working on PostSync</h1>
      // <BlogConsumer>
      //   {
      //     blog => (
      //       <Fragment>
      //         <Form loading={blog.topicsLoading} topics={blog.topics} createPost={blog.createPost}/>
      //         <Posts 
      //           savedPostsloading={blog.savedPostsLoading} 
      //           unsavedPostsPoading={blog.unsavedPostsLoading}
      //           savedPosts={blog.savedPosts} 
      //           unsavedPosts={blog.unsavedPosts}
      //         />
      //       </Fragment>
      //     )
      //   }
      // </BlogConsumer>
    );
  }
}

export default App;
